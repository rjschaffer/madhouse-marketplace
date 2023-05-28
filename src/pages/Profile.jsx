import {getAuth, updateProfile} from 'firebase/auth'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== formData.name) {
        await updateProfile(auth.currentUser,
          {displayName: formData.name})

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: formData.name
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details.')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return <>
  <div className='profile'>
    <header className="profileHeader">
      <p className="pageHeader">
        My Profile
      </p>
      <button type='button' onClick={onLogout} className="logOut">
        Logout
      </button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className='profileDetailsText'>Personal Details</p>
        <p className='changePersonalDetails' onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>
      <div className='profileCard'>
        <form>
          <input 
            type="text" 
            id="name" 
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={formData.name}
            onChange={onChange}
          />
           <input 
            type="text" 
            id="email" 
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            disabled={!changeDetails}
            value={formData.email}
            onChange={onChange}
          />
        </form>
      </div>
      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt='home'/>
        <p>Sell or rent your home.</p>
        <img src={arrowRight} alt="arrow right"/>
      </Link>  
    </main>
  </div>

  </>
  }

  export default Profile