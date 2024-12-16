import { filterOptions } from '@/config'
import { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'


const ProductFilter = () => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
         <h2 className='text-lg font-extrabold'>Filter</h2>
        </div>
        <div className='p-4 space-y-4'>
         {
            Object.keys(filterOptions).map(keyItms=><Fragment key={keyItms}>
                <div>
                    <h3 className='text-base font-bold'>{keyItms}</h3>
                    <div className='grid gap-2 mt-2'>
                        {
                        filterOptions[keyItms].map(option=><Label className="flex items-center gap-2 font-medium" key={option.id}>
                          <Checkbox/>
                          {option.label}
                        </Label>)
                        }
                    </div>
                </div>
                 <Separator/>
            </Fragment>)
         }
        </div>
    </div>
  )
}

export default ProductFilter