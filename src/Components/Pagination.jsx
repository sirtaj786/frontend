function Pagination({ currentPage, totalPages, handlePageChange }) {
    console.log("paginate",currentPage)
    let pages =new Array(totalPages)
      .fill(0)
      .map((a, i) => (
        <button
        
          onClick={() => handlePageChange(i + 1)}
          
          key={i + 1}
        >
          {i + 1}
        </button>
      ));
    return <div>
        <button onClick={()=>handlePageChange(currentPage-1)}>Previous</button>
        {currentPage}
        <button onClick={()=>handlePageChange(currentPage+1)}>Next</button>
        </div>;
  }
  
  export default Pagination;