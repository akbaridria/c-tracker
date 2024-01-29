/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button
} from '@tremor/react'
import { useTableResult, usePagination, useFormData, useFormLoading } from '@/store'
import moment from 'moment'
import { searchData, trimWallet } from '@/utils/helper'
import { useCallback } from 'react'
import { IFormResult } from '@/types'

export const FormResult = ({ addFlows }: { addFlows: (val: string, val_label: string, val2: string, val2_label: string, label: string, chain_name: string) => void }) => {

  const tableResult = useTableResult();
  const pagination = usePagination();
  const formData = useFormData();
  const loading = useFormLoading();

  const insertData = useCallback(
    (data: IFormResult) => {
      addFlows(data.from_address, data.from_label, data.to_address, data.to_label, `Transfer ${new Intl.NumberFormat('en', { notation: 'compact'}).format(data.amount)} ${data.token_address}`, data.chain_name)
    },
    []
  )

  const getMoreData = useCallback(
    async (page: number) => {
      try {
        loading.setLoading(true)
        const result = await searchData(formData.getFormData().get(), page);
        pagination.setMore(result.pagination.has_more);
        pagination.setPage(result.pagination.page_number);
        tableResult.setTableResult(result.data);
        loading.setLoading(false)
      } catch (error) {
        console.log(error)
        loading.setLoading(false);
        alert("Opps something went wrong, try again!");
      }
    },
    [],
  )

  if (tableResult.getTableResult().get().length === 0) {
    return null
  }
  return (
    <Card className=' text-sm'>
      <div className=' relative'>
        <Table className='mt-3 overflow-auto max-h-[350px]'>
          <TableHead >
            <TableRow >
              <TableHeaderCell className='bg-white'>Date</TableHeaderCell>
              <TableHeaderCell className='bg-white'>From Label</TableHeaderCell>
              <TableHeaderCell className='bg-white'>From Address</TableHeaderCell>
              <TableHeaderCell className='bg-white'>To Address</TableHeaderCell>
              <TableHeaderCell className='bg-white'>To Label</TableHeaderCell>
              <TableHeaderCell className='bg-white'>Token Name</TableHeaderCell>
              <TableHeaderCell className='bg-white'>Amount</TableHeaderCell>
              <TableHeaderCell className='bg-white'></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tableResult.getTableResult().get().map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{moment(item.date).utc().format('lll')}</TableCell>
                    <TableCell>{trimWallet(item.from_address)}</TableCell>
                    <TableCell>{item.from_label}</TableCell>
                    <TableCell>{trimWallet(item.to_address)}</TableCell>
                    <TableCell>{item.to_label}</TableCell>
                    <TableCell>{item.token_address}</TableCell>
                    <TableCell>{new Intl.NumberFormat('en', { compactDisplay: 'short' }).format(item.amount)}</TableCell>
                    <TableCell>
                      <Button size='xs' variant='secondary' disabled={loading.getLoading()} onClick={() => insertData(item)}>Add Node</Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end mt-3 text-xs'>
        <div className='flex items-center gap-4'>
          <Button icon={ChevronLeftIcon} variant='light' disabled={pagination.getPagination().get().page === 0 || loading.getLoading()} onClick={() => getMoreData(0)}>Prev</Button>
          <Button icon={ChevronRightIcon} iconPosition='right' variant='light' onClick={() => getMoreData(pagination.getPagination().get().page + 1)} disabled={!pagination.getPagination().hasMore.get() || loading.getLoading()}>Next</Button>
        </div>
      </div>
    </Card>
  )
}