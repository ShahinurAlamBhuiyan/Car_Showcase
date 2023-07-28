'use client' // after change for bug

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react';

// export default async function Home({ searchParams }) {
export default function Home() {
  const [allCars, setAllCars] = useState([]); // after change
  const [loading, setLoading] = useState(false) // after

  // search states
  const [manufacturer, setManufacturer] = useState('') // after
  const [model, setModel] = useState('') // after

  // filter states
  const [fuel, setFuel] = useState('') // after
  const [year, setYear] = useState(2022) // after

  // pagination state
  const [limit, setLimit] = useState(10) // after

  // const allCars = await fetchCars({
  // const allCars =  fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2023,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || '',
  // });


  // after...
  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2023,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    // console.log(fuel, year)
    getCars();
  }, [fuel, year, limit, manufacturer, model])

  // ---------

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;



  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          {/* <SearchBar /> */}

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
            {/* <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} /> */}
          </div>
        </div>

        {/* {!isDataEmpty ? ( */}
        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) =>
                <CarCard car={car} />
              )}
            </div>
            {/* after.... */}
            {loading && (
              <div className=' mt-16 w-full flex-center'>
                <Image
                  src='/steering-wheel.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className=' object-contain animate-spin'
                />
              </div>
            )}
            {/* -------------- */}
            <ShowMore
              pageNumber={limit/ 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
            {/* <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length}
            /> */}
            {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}

            /> */}

          </section>
        )
          : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )

        }



      </div>
    </main>
  )
}



// converting server-side
// https://github.com/adrianhajdin/project_next13_car_showcase/compare/main...client-version