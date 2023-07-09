import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { LoginPage } from "./LoginPage";
import { PostListPage } from "./PostListPage";

const useClasses = () => ({
    width50: {
        width: "50%"
    },
    width15: {
        width: "15%",
        // float: "right"
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
    padding0: {
        padding: "0"
    }
})

export const PostDetails = (props: any | undefined) => {
    const classes = useClasses();
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState<any>();
    const [result, setResult] = useState<any>();
    const [postPageChange, setPostPageChange] = useState(false);
    const [loginPageChange, setLoginPageChange] = useState(true);
    const recordsPerPage = 10;
    useEffect(() => {
        const PageLoad = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`);
                setResult(response.data);
                setLoader(false);
              } catch (err:any) {
                setError(err);
                setLoader(false);
              }
        }
        if(props.postId)
        {
            console.log("PostDetails", props.postId)
            PageLoad();
        }
    }, [])

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

  const backClick = () => {
    setLoginPageChange(false);
    setPostPageChange(true);
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
                <div className="d-flex justify-content-between mt-3 mb-2" style={classes.padding0}>
                    <button className="btn btn-primary" onClick={backClick}>Back</button>
                    <button className="btn btn-danger" onClick={logoutClick}>Logout</button>
                </div>
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>CommentID</th>
                            <th>PostID</th>
                            <th>Name</th>
                            <th>User Email</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentRecords.length>0?currentRecords.map((record: any) => (
                        <tr>
                            <td>{record.id}</td>
                            <td>{record.postId}</td>
                            <td>{record.name}</td>
                            <td>{record.email}</td>
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
            </div> : postPageChange? <PostListPage/> : <LoginPage/>}
        </div>
    )
}