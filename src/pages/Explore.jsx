import {Link} from 'react-router-dom'
import rentCategoryImage2 from '../assets/jpg/rentCategoryImage2.jpg'
import sellCategoryImage2 from '../assets/jpg/sellCategoryImage2.jpg'

function Explore() {
  return (
    <div className='explore'>
        <header>
            <p className='pageHeader'>Explore</p>            
        </header>
        
        <main>

        {/* Slider */}

        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img src={rentCategoryImage2} alt='rent'
            className='exploreCategoryImg'
            />
            <p className="exploreCategoryName">Places for Rent</p>
          </Link>
          <Link to='/category/sale'>
            <img src={sellCategoryImage2} alt='sell'
            className='exploreCategoryImg'/>
            <p className="exploreCategory">Places for Sale</p>
          </Link>
        </div>

        </main>
    </div>
  )
}

export default Explore