// import React from 'react'

import ProductFilter from "@/components/shopping-section/filter"
import ShoppingProductTile from "@/components/shopping-section/product-tail"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { getAllProducts } from "@/store/admin/product-slice"
import { fetchAllShoppingProducts } from "@/store/user/products-slice"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const ShoppingListing = () => {
  const [sortList, setSortList] = useState(null);
  const [filterList, setFilterList] = useState({});
  // fetch list of products
  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.shoppingProducts)

  useEffect(() => {
    dispatch(fetchAllShoppingProducts())
  }, [dispatch])

  // sort products
  const handleSort = (value) => {
    console.log('value: ', value);
  }
  // filter product
  const handleFilter = (getSectionId, getFilterOption) => {
    console.log(getSectionId, getFilterOption);
    let cpyFilter = { ...filterList };
    const indexOfCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId)
    if (indexOfCurrentSection === -1) {
      cpyFilter = { ...cpyFilter, [getSectionId]: [getFilterOption] }
    }
    console.log('cpyFilter: ', cpyFilter);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filterList={filterList} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sortList} onValueChange={handleSort}>
                  {
                    sortOptions.map((sortItem) => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4">
          {
            productList && productList.length > 0 ? productList.map(productItem => <ShoppingProductTile product={productItem} />) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing