import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { LoginPage } from "./LoginPage";
import { PostDetails } from "./PostDetails";

const useClasses = () => ({
    width50: {
        width: "50%"
    },
    width15: {
        width: "15%",
    },
    marginTop40: {
        marginTop: "40px"
    },
    postBackground: {
        background: "white",
        borderRadius: "20px"
    },
    textDecorationNone: {
        textDecoration: "none"
    },
    marginTop5: {
        marginTop: "5px"
    },
    postIDStyle: {
        cursor: "pointer",
        color: "cornflowerblue",
        textDecoration: "none"
    },
    padding0: {
        padding: "0"
    }
})

export const PostListPage = (props: any | undefined) => {
    const classes = useClasses();
    const [currentPage, setCurrentPage] = useState(1);
    const [userId, setUserId] = useState("");
    const [postId, setPostId] = useState("");
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState<any>();
    const [result, setResult] = useState<any>()
    const [initialResult, setInitialResult] = useState<any>()
    const [loginPageChange, setLoginPageChange] = useState(true);
    const [postDetails, setPostDetails] = useState(false);
    const recordsPerPage = 10;
    useEffect(() => {
        const PageLoad = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setResult(response.data);
                setInitialResult(response.data);
                setLoader(false);
              } catch (err:any) {
                setError(err);
                setLoader(false);
              }
        }
        PageLoad();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [result])

  // Calculate the index of the first and last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let currentRecords:any = [];
  let pageNumbers: any = [];

  // Generate an array of records for the current page
  if(result && result != null)
  {
    currentRecords = result.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  // When clicked on a page number
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // When clicked on logout
  const logoutClick = () => {
    setLoginPageChange(false);
  }

  // User ID search box
  const userIdOnChange = (event: any) => {
    let value = event.target.value;
    console.log(value);
    setUserId(value)
    userIdEnter(event);
  }

  const postIdClick = (event: any) => {
    console.log(event.target.innerText);
    setLoginPageChange(false);
    setPostDetails(true)
    setPostId(event.target.innerText);
  }

  // Enter click of search
  const userIdEnter = (event: any) => {
      const id = event.target.value;
        if (event.charCode === 13 && id!="") {
            event.preventDefault();
            const filteredData = initialResult.filter(
                (item: any) =>
                    item.userId == id
            );
            setResult(filteredData)
        }
        else{
            setResult(initialResult)
        }
  }

  // Generate page numbers
  if(result && result != null){
    pageNumbers = Array.from(
    { length: Math.ceil(result.length / recordsPerPage) },
    (_, index) => index + 1
  );
  }

  if (loader) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error.message}
      </div>
    );
  }


    return(
        <div>
            {loginPageChange? <div className="container">
                <div className="row mt-n5">
                <div className="row justify-content-end mb-3" style={classes.marginTop5}>
                    <div className="col-auto">
                        <input type="text" className="form-control" placeholder="Search by UserID" onKeyPress={(event) => userIdEnter(event)} value={userId} onChange={userIdOnChange}/>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger" onClick={logoutClick}>
                            Logout
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>PostID</th>
                            <th>UserID</th>
                            <th>Title</th>
                            <th>Post Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentRecords.length>0?currentRecords.map((record: any) => (
                        <tr>
                            <td><a style={classes.postIDStyle} onClick={(event)=>postIdClick(event)}>{record.id}</a></td>
                            <td>{record.userId}</td>
                            <td>{record.title}</td>
                            <td>{record.body}</td>
                        </tr>
                    )):null}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <nav>
                    <ul className="pagination">
                        {pageNumbers.map((pageNumber: any) => (
                        <li className={`page-item${currentPage === pageNumber ? ' active' : ''}`} key={pageNumber}>
                            <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                            {pageNumber}
                            </button>
                        </li>
                        ))}
                    </ul>
                    </nav>
                </div>
                </div>
            </div> : postDetails ? <PostDetails postId={postId}/> : <LoginPage/>}
        </div>
    )
}