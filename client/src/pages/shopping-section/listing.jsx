// import React from 'react'

import ProductFilter from "@/components/shopping-section/filter"
import ProductDetailDialog from "@/components/shopping-section/product-detail"
import ShoppingProductTile from "@/components/shopping-section/product-tail"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { addToCart, fetchCartItem } from "@/store/user/cart-slice"
// import { getAllProducts } from "@/store/admin/product-slice"
import { fetchAllShoppingProducts, fetchProductDetail } from "@/store/user/products-slice"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

// helper function for query string
const createSearchParamHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",")
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join("&")
}


const ShoppingListing = () => {
  const [sortList, setSortList] = useState(null);
  const [filterList, setFilterList] = useState({});
  const [searchParams, setSearchParams] = useSearchParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useSelector(state => state.auth)
  console.log('user: ', user);
  // open product detail dailog when product details has value


  // fetch list of products
  const dispatch = useDispatch();
  const { productList, productDetail } = useSelector(state => state.shoppingProducts)
  const {cartItems} =useSelector(state=>state.shoppingCart)
  console.log('cartItems: ', cartItems);
  console.log('productList: ', productList);
  console.log('productDetail: ', productDetail);
  useEffect(() => {
    if (productDetail !== null) {
      setIsDialogOpen(true)
    }
  }, [productDetail])
  useEffect(() => {
    if (sortList !== null && filterList !== null)
      dispatch(fetchAllShoppingProducts({ filterParams: filterList, sortParams: sortList }))
  }, [dispatch, sortList, filterList])

  useEffect(() => {
    setSortList('price-lowtohigh')
    setFilterList(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  useEffect(() => {
    if (filterList && Object.keys(filterList).length > 0) {
      const createQueryString = createSearchParamHelper(filterList)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filterList])

  // sort products
  const handleSort = (value) => {
    console.log('value: ', value);
    setSortList(value)
  }
  // filter product
  const handleFilter = (getSectionId, getFilterOption) => {
    let cpyFilter = { ...filterList };
    const indexOfCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId)
    if (indexOfCurrentSection === -1) {
      cpyFilter = { ...cpyFilter, [getSectionId]: [getFilterOption] }
    } else {
      const indexOfCurrentOption = cpyFilter[getSectionId].indexOf(getFilterOption)
      if (indexOfCurrentOption === -1) {
        cpyFilter[getSectionId].push(getFilterOption)
      } else {
        cpyFilter[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilterList(cpyFilter)
    sessionStorage.setItem("filters", JSON.stringify(cpyFilter))
  }

  const handleGetProductDetails = (getCurrentProId) => {
    console.log('getCurrentProId: ', getCurrentProId);
    dispatch(fetchProductDetail(getCurrentProId))
  }

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?.id))
      }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filterList={filterList} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length} Products</span>
            <DropdownMenu >
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] z-50 bg-white">
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
            productList && productList.length > 0 ? productList.map(productItem => <ShoppingProductTile key={productItem._id} product={productItem} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />) : null
          }
        </div>
      </div>
      <ProductDetailDialog open={isDialogOpen} setOpen={setIsDialogOpen} productDetail={productDetail} />
    </div>
  )
}

export default ShoppingListing