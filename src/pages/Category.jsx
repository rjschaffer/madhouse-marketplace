import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'


function Category() {
const [listings, setListings] = useState(null)
const [loading, setLoading] = useState(true)
const params = useParams()
const [lastFetchedListing, setLastFetchedListing] = useState(null)

useEffect(() => {
    const fetchListings = async () => {

        try {
            const listingsRef = collection(db, 'listings')

            const q = query(listingsRef, 
                where('type', '==', params.categoryName), 
                orderBy('timestamp', 'desc'), 
                limit(1)
            )

            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length-1]
            
            setLastFetchedListing(lastVisible)

            let listings = []

            querySnap.forEach((doc)=> {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings(listings)
            setLoading(false)

        } catch (error) {
            toast.error('Could not fetched listings.')
        }
    }

    fetchListings()
}, [params.categoryName])

//Pagination / Load More

const onFetchMoreListings = async () => {

    try {
        const listingsRef = collection(db, 'listings')

        const q = query(listingsRef, 
            where('type', '==', params.categoryName), 
            orderBy('timestamp', 'desc'), 
            startAfter(lastFetchedListing),
            limit(1)
        )

        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        
        setLastFetchedListing(lastVisible)

        let listings = []

        querySnap.forEach((doc)=> {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })

        setListings((prevState) => [...prevState, ...listings])
        setLoading(false)

    } catch (error) {
        toast.error('Could not fetched listings.')
    }
}

  return (
    <div className='category'>
        <header className='pageHeader'>
            <p>
                {params.categoryName === 'rent' ? 'Places for Rent' : 'Places for Sale'}
            </p>
        </header>

        {loading ? (
            <Spinner /> 
        ) : listings && listings.length > 0 ? (
            <>
                <main>
                    <ul className="categoryListings">
                        {listings.map((listing) => (
                            <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                        ))}
                    </ul>
                </main>

                <br />
                <br />
                {lastFetchedListing && (
                    <p className="loadMore" onClick={onFetchMoreListings}>
                        Load More
                    </p>
                )}
            </> 
        ) : (
            <p>No listings for {params.categoryName}</p>
        )}
    </div>
  )
}

export default Category