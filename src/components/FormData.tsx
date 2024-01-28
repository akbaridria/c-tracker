'use client';

import { Button, Card, TextInput, Select, SelectItem, DateRangePicker, DateRangePickerValue } from "@tremor/react";
import { SearchIcon } from "@heroicons/react/solid";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import data from '@/data.json';
import { useTableResult, usePagination, useFormData, useFormLoading } from '@/store';
import { client, searchData } from '@/utils/helper'
import { Spinner } from "./Spinner";
import { Chain } from "@covalenthq/client-sdk";
import moment from 'moment'


export const FormData = () => {

  const tableResult = useTableResult();
  const pagination = usePagination();
  const formData = useFormData();
  const loading = useFormLoading();

  const [dateRange, setDateRange] = useState<DateRangePickerValue>({ from: new Date(2024, 0, 1), to: new Date() });
  const [chainName, setChainName] = useState<string>(formData.getFormData().get().chain_name);
  const [errors, setErrors] = useState<{ chainName: string, dateRange: string }>({ chainName: '', dateRange: '' });

  const formSchema = z.object({
    wallet_address: z.string({ required_error: 'wallet adress is required' }).min(42),
    token_address: z.string({ required_error: 'erc20 contract address is required' }).min(42)
  })

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallet_address: formData.getFormData().get().wallet_address,
      token_address: formData.getFormData().get().token_address
    },
  })

  async function onSubmit(values: FormSchema) {

    if (chainName === '') {
      setErrors({ ...errors, chainName: 'Select chain' })
      return
    }

    if (Object.keys(dateRange).length === 0 || !(!!dateRange.to)) {
      setErrors({ ...errors, dateRange: 'Pick date range' })
      return
    }

    if (chainName !== '' && Object.keys(dateRange).length > 0) {
      setErrors({ chainName: '', dateRange: '' });
      loading.setLoading(true)

      try {
        tableResult.setTableResult([]);
        const endingDate =  dateRange.to?.toString() !== dateRange.from?.toString() ? moment(dateRange.to).format('YYYY-MM-DD') : moment(dateRange.from).add(1, 'days').format('YYYY-MM-DD')
        const startBlock = await client.BaseService.getBlockHeightsByPage(chainName as Chain, moment(dateRange.from as Date).format('YYYY-MM-DD'), moment(dateRange.from as Date).add(1, 'days').format('YYYY-MM-DD'), { pageSize: 1 })
        const endBlock = await client.BaseService.getBlockHeightsByPage(chainName as Chain, endingDate , moment(endingDate).add(1, 'days').format('YYYY-MM-DD'), { pageSize: 1 })
        const result = await searchData({ chain_name: chainName, wallet_address: values.wallet_address, token_address: values.token_address, start_block: startBlock.data.items[0].height, end_block: endBlock.data.items[0].height}, 0);
        pagination.setMore(result.pagination.has_more);
        pagination.setPage(result.pagination.page_number);
        tableResult.setTableResult(result.data);
        formData.setFormData({ chain_name: chainName, end_block: endBlock.data.items[0].height, start_block: startBlock.data.items[0].height, token_address: values.token_address, wallet_address: values.wallet_address});
        loading.setLoading(false)
      } catch (error) {
        console.log(error)
        alert('Oops something went wrong, try again!');
        loading.setLoading(false)
      }
      // submit
      return
    }



  }

  return (
    <Card className="w-[1300px] max-w-screen h-fit text-sm">
      <form className="grid grid-cols-[1fr_1fr_1fr_1fr_200px] items-center gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="from_address">Wallet Address <span className="text-red-600">*</span></label>
          <TextInput placeholder="Enter wallet address here" {...form.register("wallet_address")} disabled={loading.getLoading()} />
          <label htmlFor="" className="text-red-600 text-xs">{form.formState.errors.wallet_address?.message} &nbsp;</label>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="from_address">Token Addresss <span className="text-red-600">*</span></label>
          <TextInput placeholder="Input token contract address here" className="text-sm" {...form.register("token_address")} disabled={loading.getLoading()} />
          <label className="text-red-600 text-xs" htmlFor="">{form.formState.errors.token_address?.message} &nbsp;</label>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="from_address">Select Chain <span className="text-red-600">*</span></label>
          <Select className="text-sm" value={chainName} onValueChange={setChainName} disabled={loading.getLoading()} >
            {data.chains.map((item) => {
              return (
                <SelectItem key={item.chain_name} value={item.chain_name} >
                  {item.chain_name}
                </SelectItem>
              )
            })}
          </Select>
          <label htmlFor="" className="text-red-600 text-xs">{errors.chainName} &nbsp;</label>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="date-range">Date Range <span className="text-red-600">*</span></label>
          <DateRangePicker className="w-full" enableSelect={false} value={dateRange} onValueChange={setDateRange} disabled={loading.getLoading()} maxDate={new Date((new Date()).setDate((new Date()).getDate() - 1))} />
          <label htmlFor="" className="text-red-600 text-sm">{errors.dateRange} &nbsp;</label>
        </div>
        <div className="grid grid-cols-1 w-fit gap-2">
          <label htmlFor=""></label>
          <Button icon={loading ? undefined : SearchIcon} variant="primary" className="mt-4 h-fit" disabled={loading.getLoading()}>
            {!loading.getLoading() && 'Search Data'}
            {loading.getLoading() && <div className="flex items-center"><Spinner /> Searching data</div>}
          </Button>
          <label htmlFor="" className="text-red-600 text-xs">&nbsp;</label>
        </div>
      </form>
    </Card>
  )
}

export default FormData;