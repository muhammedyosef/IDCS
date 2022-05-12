import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faLocationDot,faClock,faSearch,faBuilding,faBookOpen, faHeart, faCar, faKeyboard, faEnvelope, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../AxiosConfigure';
import { faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axiosInstance1 from '../AxiosConfigure/candidate';

export default function Home() {
    const [isActive, setActive] = useState(true);
    const [noOfJobs, setnoOfJobs] = useState(5);
    const [noOfUsers, setnoOfUsers] = useState(6);
    const [noOfStart, setnoOfStart] = useState(0);
    const [noOfID, setnoOfID] = useState(1);
    const [select,setSelect]=useState();
    const [jobs,setJobs]=useState([]);
    const [users,setUsers]=useState([]);
    const [allUsers,setAllUsers]=useState([]);
    const [job,setJob]=useState({});
    const [jobSlider,setJobSlider]=useState([]);
    const [searchJob,setSearchJob]=useState('');
    const [searchLocation,setSearchLocation]=useState('');
    const loadMore = ()=>{
        setnoOfJobs(noOfJobs + 5)
        }
        const loadMoreUsers = ()=>{
          setnoOfStart(noOfUsers)
          setnoOfUsers(noOfUsers + 6)
          }
          const loadLessUsers = ()=>{
            
            setnoOfStart(noOfStart-6)
            setnoOfUsers(noOfUsers - 6)
            }
        const next = ()=>{
          console.log(noOfID);
          if(noOfID<=100){
            setnoOfID(noOfID+1)
          }
          }
          const prev=()=>{
            console.log(noOfID);
            if(noOfID>1){
              setnoOfID(noOfID-1)
            }
          }
          const filter=()=>{
if(select&&searchJob.length==0&&searchLocation.length==0){
  
  const search=jobSlider.filter((e)=>e.companyName===select);
  setJobs(search);
}
if(!select&&searchJob.length>0&&searchLocation.length==0){
  
  const search=jobSlider.filter((e)=>e.jobtitle.toUpperCase().includes(searchJob.toUpperCase()));
  setJobs(search);
}
if(!select&&searchJob.length==0&&searchLocation.length>0){
  
  const search=jobSlider.filter((e)=>e.location.toUpperCase().includes(searchLocation.toUpperCase()));
  setJobs(search);
}
if(select&&searchJob.length>0&&searchLocation.length==0){
  const search= jobSlider.filter((e)=>e.companyName==select&&e.jobtitle.toUpperCase().includes(searchJob.toUpperCase()));
  setJobs(search);
}
if(select&&searchJob.length==0&&searchLocation.length>0){
  const search= jobSlider.filter((e)=>e.companyName==select&&e.location.toUpperCase().includes(searchLocation.toUpperCase()));
  setJobs(search);
}
if(!select&&searchJob.length>0&&searchLocation.length>0){
  const search=jobSlider.filter((e)=>e.jobtitle.toUpperCase().includes(searchJob.toUpperCase())&&e.location.toUpperCase().includes(searchLocation.toUpperCase()));
  setJobs(search);
} if(select&&searchJob.length>0&&searchLocation.length>0){
  const search=jobSlider.filter((e)=>e.companyName==select&&e.jobtitle.toUpperCase().includes(searchJob.toUpperCase())&&e.location.toUpperCase().includes(searchLocation.toUpperCase()));
  setJobs(search);
} 

          }
  const explore=()=>{
setUsers(allUsers);
          }
useEffect(()=>{
  if(select=='Select Industry'){setSelect(undefined)}
  
    axiosInstance.then((res)=>{  
        setJobSlider(res.data);
     setJobs(res.data.slice(0, noOfJobs));
    res.data.map((x)=>{
      if(x.id==noOfID){
        setJob(x)
      }
    })
    })
    .catch((err)=>console.log(err))
axiosInstance1.then((res)=>{
  setAllUsers(res.data);
  setUsers(res.data.slice(noOfStart,noOfUsers))
 
}).catch((err)=>console.log(err))
},[noOfJobs,noOfID,noOfUsers,select])

  const toggleClass = () => {
    setActive(!isActive);
  };
 
  return (
      <>
      <div className='container'>

      <>
      <div className="card text-center">
  <div className="card-header">
    <ul className="nav nav-tabs card-header-tabs">
      <li className="nav-item" >
        <a className={ isActive ? 'nav-link active':'btn-dark btn ' } onClick={toggleClass}>Jobs</a>
      </li>
      <li className="nav-item">
        <a  className={ isActive ? ' btn btn-dark':'nav-link active' } onClick={toggleClass}>Find Resume</a>
      </li>
      
    </ul>
  </div>
  {isActive?
  <>
  <div className='row shadow-sm '>
      <div className='col-3 '>
      <label>JOBS</label>
      <br/>
      <input type='text' placeholder='job title/keyword' name='job'value={searchJob} onChange={(e)=>{setSearchJob(e.target.value)}} />
      </div>
      <div className='col-3 border'>
      <label>LOCATIONS</label>
      <br/>
      <input type='text' placeholder='city,proveince or region' name='location' value={searchLocation} onChange={(e)=>{setSearchLocation(e.target.value)}}/>
      </div>
        <div className='col-3 border'>
      <label>CATEGORY</label>
      <br/>
      <select className="form-select my-3 " aria-label="Default select example" onChange={e=>{setSelect(e.target.value)}}>
  <option value={undefined} >Select Industry</option>
  {jobSlider.map((prod)=>{
    return(
  <option value={prod.companyName}>{prod.companyName}</option>

    )
  })}
  
</select>
      </div>
        <div className='col-3 '>
       
        <button type="button" className="btn btn-dark btn-lg m-3 w-75"  onClick={()=>filter()}> <FontAwesomeIcon icon={faSearch} />Search</button>
      
      </div>
  </div>  
  </>:<p>Anything</p>
}
</div>
      </>
<br/>
{isActive?
<div className='row'>
<div className='col-8  border '>
<p className='d-flex justfiy-content-start'>we have {jobSlider.length} potential jobs for you </p>
<hr/> 
     <table className="table ">
  
  <tbody>
        {jobs!==undefined&&jobs.map((job)=>{
            return(<>
    <tr>
            
            
            <td ><div>
            {job.jobtitle}
                </div>
                <div>
                    <span>{job.companyName}</span> | <span>{job.jobType}</span>
                </div>
                </td>
            <td className='text-muted'><FontAwesomeIcon icon={faLocationDot} /> {job.location}</td>
            <td className='text-muted'><FontAwesomeIcon icon={faClock} /> {job.createdAt.split("T")[0] }</td>
    </tr>
            </>)

        })}
    
    <td colspan="3">

  <button type="button" className="btn btn-light bg-light mt-3 btn-lg w-100"  disabled={noOfJobs===100} onClick={()=>loadMore()}>Load more</button>
    </td>
  </tbody>
</table>
</div>
<div className='col-3 border ms-5 shadow-sm '>
<div className="mb-3">
  <label className='mt-3' >JOBS</label><br/>
  <input className='mt-3' type='text' placeholder='job title/keyword' name='job'value={searchJob} onChange={(e)=>{setSearchJob(e.target.value)}} />
</div>
<div className="mb-3">
  <label  className='mt-3'>LOCATION</label> <br/>
  <input className='mt-3' type='text' placeholder='city,proveince or region' name='location' value={searchLocation} onChange={(e)=>{setSearchLocation(e.target.value)}}/>
</div>
<div className="mb-3">
  <label>CATEGORY</label>
<select className="form-select my-3 " aria-label="Default select example" onChange={e=>{setSelect(e.target.value)}}>
  <option selected>Select Industry</option>
  {jobSlider.map((prod)=>{
    return(
  <option value={prod.companyName}>{prod.companyName}</option>

    )
  })}
  
</select>
</div>
<div className='mb-3'>
<button type="button" className="btn btn-dark btn-lg m-3 w-75"  onClick={()=>filter()}> <FontAwesomeIcon icon={faSearch} />Search</button>
</div>
</div>

</div>
:<></>}
<div className='row'>
<div className='col-8 mt-5 '>
<ul className="list-group list-group-horizontal ">
  <li className="list-group-item ">
    
      <div className='row'>
        <div className='col-4'>
     <FontAwesomeIcon className='w-75 h-75 text-primary' icon={faBuilding} /> 
        </div>
        <div className='col-8'>
    Construction&build <br/>
    <small className='text-muted'>7 open positions</small>
        </div>
      </div>
    
     </li>
  <li className="list-group-item ">
  <div className='row'>
        <div className='col-4'>
     <FontAwesomeIcon className='w-75 h-75 text-primary' icon={faBookOpen} /> 
        </div>
        <div className='col-8'>
    Education&Training <br/>
    <small className='text-muted'>32 open positions</small>
        </div>
      </div>

  </li>
  <li className="list-group-item ">
  <div className='row'>
        <div className='col-4'>
     <FontAwesomeIcon className='w-75 h-75 text-primary' icon={faCalculator} /> 
        </div>
        <div className='col-8'>
          Accounting&Finance
    <br/>
    <small className='text-muted'>0 open positions</small>
        </div>
      </div>

  </li>
</ul>

<ul className="list-group list-group-horizontal mb-5">
  <li className="list-group-item ">
    
      <div className='row'>
        <div className='col-4'>
     <FontAwesomeIcon className='w-75 h-75 text-primary' icon={faHeart} /> 
        </div>
        <div className='col-8'>
    HealthCare&Beauty <br/>
    <small className='text-muted'>2 open positions</small>
        </div>
      </div>
    
     </li>
  <li className="list-group-item ">
  <div className='row'>
        <div className='col-4'>
     <FontAwesomeIcon className='w-75 h-75 text-primary' icon={faCar} /> 
        </div>
        <div className='col-8'>
    Cars&Automotive <br/>
    <small className='text-muted'>9 open positions</small>
        </div>
      </div>

  </li>
  <li className="list-group-item ">
  <div className='row'>
        <div className='col-4'>
     <FontAwesomeIcon className='w-75 h-75 text-primary' icon={faKeyboard} /> 
        </div>
        <div className='col-8'>
          Web Development
    <br/>
    <small className='text-muted'>8 open positions</small>
        </div>
      </div>

  </li>
</ul>

<div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
  <div className="card text-white bg-dark mb-3" >
  <div className="card-header position-relative">
  <FontAwesomeIcon className='w-25 text-white position-absolute top-50 start-0' icon={faTelegram} /> 
    
     Subscribe Our News
     </div>
  <div className="card-body">
    {/* <h5 className="card-title">Dark card title</h5> */}
    <p className="card-text">Subscribe to our newsettler to get  the latest jobs posted,candidtes,and latest news</p>
    <div className='position-relative'>
    <input type="text" placeholder=" Enter your Email" className='ps-5 '/>
      <FontAwesomeIcon icon={faEnvelope} style={{position:'absolute',left:'80',top:'12'}} className='text-muted'/>
    </div>
  </div>
  <button style={{backgroundColor:'#3f48cc'}} className='p-2 m-3 text-white w-auto'>Subscribe</button>
</div>
  </div>
  <div className="col">
  <div className="card text-white bg-info mb-3" >
  <div className="card-header position-relative">
  <FontAwesomeIcon className='w-25 h-75 text-white position-absolute top-0 start-0' icon={faTwitter} /> 
    
    Latest Tweets
  </div>
  <div className="card-body">
    <h5 className="card-title"><span className="badge bg-dark d-flex justify-content-start w-25 m-3">@tielabs</span></h5>
    <p className="card-text">We have realeased a major update for instaNOW plugin (formerly instagramy) v2.0 <br/> http://tie.li/insta-now</p>
  </div>
  <div className="card-footer bg-transparent d-flex justifit-content-start ">
  <FontAwesomeIcon icon={faClock} /> <span className='ms-3'>
     8 hours ago
    </span>
  </div>
</div>
  </div>

</div>

</div>
{isActive?
<div className='col-3 mt-5 ms-5'>
  <div>Featured Jobs</div>
<div className="card border-success mb-3" >
  <div className="card-header bg-transparent border-success">
    <div>
{job.jobtitle}
    </div>
    <div>
    <span>{job.companyName}</span> | <span>{job.jobType}</span>
    </div>
    </div>
  <div className="card-body text-muted">
    {/* <h5 className="card-title">Success card title</h5> */}
    <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum</p>
    <small>
        <FontAwesomeIcon icon={faLocationDot}/>&#160;
        {job.location}
        &#160;&#160;&#160;&#160;&#160;
        <FontAwesomeIcon icon={faClock}/>&#160;
        {job.createdAt!==undefined&& job.createdAt.split("T")[0]}

    </small>
  </div>
  <div className="card-footer bg-transparent d-flex justify-content-between">
    <button className='text-muted' onClick={()=>prev()} disabled={noOfID===0}>
    <FontAwesomeIcon icon={faArrowLeft}  />
    </button>
    <button className='text-muted' onClick={()=>next()} disabled={noOfID==100}>
    <FontAwesomeIcon icon={faArrowRight}/>
    </button>
    <button style={{backgroundColor:'#3f48cc'}} className='text-white p-1'>APPLY FOR THIS JOB</button>
    </div>
</div>

</div>
:<></>}
</div>
<div >

<div style={{backgroundColor:'#3f48cc'}}>
<div className='pt-5 pb-5 text-white'>
  <p >FIND TOP TALENTS</p>
  <h1 >Explore Our Latest Candidates</h1>
  <h1 className='text-dark'>___</h1>
  <p>work with someone perfect for your team & get amazing results<br/> working with the best employees,hire talents with confidence</p>
</div>
</div>

<div className='d-flex' >
<button className='text-muted bg-transparent btn btn-outline-transparent me-2' onClick={()=>loadLessUsers()} disabled={noOfUsers===6}>
    <FontAwesomeIcon icon={faArrowLeft}  />
    </button>
<div className="row row-cols-1 row-cols-md-6 g-4">
  {users.map((user)=>{
return(

  <div className="col">
    <div className="card h-100">
      {/* <img src={user.avatar} className="card-img-top" alt="..."/> */}
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.title}</p>
      </div>
    </div>
  </div>
)
  })}
</div>
<button className='text-muted bg-transparent btn btn-outline-transparent ms-2' onClick={()=>loadMoreUsers()} disabled={noOfUsers==30}>
    <FontAwesomeIcon icon={faArrowRight}/>
    </button>
</div>

</div>

<button className='btn btn-dark m-5' onClick={()=>explore()}>Explore All </button>
      </div>
      </>
  )
}
