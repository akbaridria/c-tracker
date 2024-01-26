import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  Card,
  Title,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button
} from '@tremor/react'

export const FormResult = () => {
  return (
    <Card className='w-fit text-sm'>
      <Title>List Of Transfer ERC20</Title>
      <div className=' relative'>
      <Table className='mt-3 overflow-auto max-h-[350px]'>
        <TableHead >
          <TableRow >
            <TableHeaderCell className='bg-white'>Date</TableHeaderCell>
            <TableHeaderCell className='bg-white'>From Address</TableHeaderCell>
            <TableHeaderCell className='bg-white'>To Address</TableHeaderCell>
            <TableHeaderCell className='bg-white'>Token Address</TableHeaderCell>
            <TableHeaderCell className='bg-white'>Amount</TableHeaderCell>
            <TableHeaderCell className='bg-white'></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Array(30).fill(0).map((item) => {
              return (
                <TableRow key={item}>
                  <TableCell>new date</TableCell>
                  <TableCell>0xblabla</TableCell>
                  <TableCell>0xblabla</TableCell>
                  <TableCell>0xblabla</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>
                    <Button size='xs' variant='secondary'>Add Node</Button>
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
            <Button icon={ChevronLeftIcon} variant='light'>Prev</Button>
            <Button icon={ChevronRightIcon} iconPosition='right' variant='light'>Next</Button>
          </div>
      </div>
    </Card>
  )
}