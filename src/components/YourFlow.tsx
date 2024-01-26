import {
  Card,
  Title,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
} from '@tremor/react'

export const YourFlow = () => {
  return (
    <Card className='w-fit text-sm'>
      <Title>Your Flow</Title>
      <div className=' relative'>
      <Table className='mt-3 overflow-auto max-h-[500px]'>
        <TableHead >
          <TableRow >
            <TableHeaderCell className='bg-white'>Date</TableHeaderCell>
            <TableHeaderCell className='bg-white'>From Address</TableHeaderCell>
            <TableHeaderCell className='bg-white'>To Address</TableHeaderCell>
            <TableHeaderCell className='bg-white'>Token Address</TableHeaderCell>
            <TableHeaderCell className='bg-white'>Amount</TableHeaderCell>
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
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      </div>
    </Card>
  )
}