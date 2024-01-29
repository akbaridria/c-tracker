import { trimWallet } from '@/utils/helper'
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
import { Edge } from 'reactflow'

export const YourFlow = ({ flows, deleteFlow }: { flows: Edge[], deleteFlow: (id: string) => void }) => {
  return (
    <Card className='w-fit text-sm'>
      <Title>Your Flow</Title>
      <div className=' relative'>
        <Table className='mt-3 overflow-auto max-h-[500px]'>
          <TableHead >
            <TableRow >
              <TableHeaderCell className='bg-white'>From Address</TableHeaderCell>
              <TableHeaderCell className='bg-white'>To Address</TableHeaderCell>
              <TableHeaderCell className='bg-white'>Chain</TableHeaderCell>
              <TableHeaderCell className='bg-white'>Transfers</TableHeaderCell>
              <TableHeaderCell className='bg-white'></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              flows.map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{trimWallet(item.id.split('|')[0].split('-')[0])}</TableCell>
                    <TableCell>{trimWallet(item.id.split('|')[1].split('-')[1])}</TableCell>
                    <TableCell>{ item.id.split('|')[0].split('-').slice(1,3).join('-') }</TableCell>
                    <TableCell>
                      <ul>
                        {item.data.map((item: string) => {
                          return (
                            <li key={item}>{ item }</li>
                          )
                        })}
                      </ul>
                    </TableCell>
                    <TableCell><Button variant='light' onClick={() => deleteFlow(item.id)}>Delete Flow</Button></TableCell>
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