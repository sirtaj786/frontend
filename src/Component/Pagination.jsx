function Pagination({ currentPage, totalPages, handlePageChange }) {
    let pages = new Array(totalPages)
      .fill(0)
      .map((a, i) => (
        <button
         
          onClick={() => handlePageChange(i + 1)}
          
          key={i + 1}
        >
          {i + 1}
        </button>
      ));
      console.log(totalPages,"tot")
    return <div>{pages}</div>;
  }
  
  export default Pagination;