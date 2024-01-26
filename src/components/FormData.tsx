'use client';

import { Button, Card, TextInput, Select, SelectItem, DateRangePicker } from "@tremor/react";
import { SearchIcon } from "@heroicons/react/solid";

export const FormData = () => {
  return (
    <Card className="min-w-[400px] h-fit text-sm">
      <div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="from_address">Wallet Address <span className="text-red-600">*</span></label>
          <TextInput placeholder="Enter wallet address here" name="from_address" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="from_address">Token Addresss <span className="text-red-600">*</span></label>
          <TextInput placeholder="Input token contract address here" name="token_contract" className="text-sm" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="from_address">Select Chain <span className="text-red-600">*</span></label>
          <Select className="text-sm">
            <SelectItem value="1" >
              Kilometers
            </SelectItem>
            <SelectItem value="2" >
              Meters
            </SelectItem>
            <SelectItem value="3">
              Miles
            </SelectItem>
            <SelectItem value="4" >
              Nautical Miles
            </SelectItem>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="date-range">Date Range <span className="text-red-600">*</span></label>
          <DateRangePicker className="max-w-sm mx-auto" enableSelect={false} />
        </div>
        <Button icon={SearchIcon}  variant="primary" className="mt-2">
          Search Data
        </Button>
      </div>
    </Card>
  )
}

export default FormData;