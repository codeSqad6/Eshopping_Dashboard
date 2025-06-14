// import React from 'react'
import React, { useState } from 'react';
// const CNavproducts = () => {
//   return (
//     <div className="flex">
//       <div className="flex-1 p-6">
//         {/* <h1 className="text-2xl font-bold">Welcome TO Products page</h1> */}

//       </div>
//     </div>
//   )
// }

// export default CNavproducts
function App() {
  const initialProducts = [
    {
      id: 1,
      name: 'Laptop',
      image: 'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
      brand: 'Dell',
      type: 'Electronics',
      price: 1200,
      discount: 10,
      status: 'Active',
    },
    {
      id: 2,
      name: 'T-Shirt',
      image: 'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',
      brand: 'Nike',
      type: 'Clothing',
      price: 50,
      discount: 5,
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Laptop',
      image: 'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
      brand: 'Dell',
      type: 'Electronics',
      price: 1300,
      discount: 10,
      status: 'Active',
    },
    {
      id: 4,
      name: 'T-Shirt',
      image: 'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',
      brand: 'Nike',
      type: 'Clothing',
      price: 100,
      discount: 5,
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Laptop',
      image: 'https://th.bing.com/th/id/R.3a1a002c3944586115b5e3738f4c652c?rik=L%2bK%2bwiZM7VfOnw&pid=ImgRaw&r=0',
      brand: 'Dell',
      type: 'Electronics',
      price: 1400,
      discount: 10,
      status: 'Active',
    },
    {
      id: 6,
      name: 'T-Shirt',
      image: 'https://th.bing.com/th/id/R.b3c5e724216335fad832b93348f497f2?rik=Yys2kv6q5hiTYg&riu=http%3a%2f%2fimg.ltwebstatic.com%2fimages%2fpi%2f201707%2f2f%2f14990734971273770034.jpg&ehk=qug4n1YyxWOcbqD2HpJ81jNA%2bx19D5zQgMoliuvlS08%3d&risl=&pid=ImgRaw&r=0',
      brand: 'Nike',
      type: 'Clothing',
      price: 150,
      discount: 5,
      status: 'Inactive',
    },


  ];

  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const handleEdit = (product) => {
    alert(`Edit clicked for ${product.name}`);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const styles = {
    container: { padding: '30px', fontFamily: 'Arial, sans-serif' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { backgroundColor: '#4A90E2', color: 'white', padding: '10px', fontSize: '16px', border: 'none',textAlign:'center' },
    td: { padding: '10px', border: 'none', textAlign: 'center' },
    active: { color: 'green', fontWeight: 'bold' },
    inactive: { color: 'red', fontWeight: 'bold' },
    button: { margin: '5px', padding: '8px 12px', cursor: 'pointer', border: 'none', borderRadius: '4px' },
    addButton: { backgroundColor: '#28a745', color: 'white' },
    editButton: { backgroundColor: '#ffc107', color: 'black' },
    deleteButton: { backgroundColor: '#dc3545', color: 'white' },
    image: { width: '75px', height: '75px' },
    pagination: { marginTop: '20px', textAlign: 'center' },
    pageBtn: { margin: '0', padding: '3px 10px', cursor: 'pointer' ,border: '1px solid #ccc'}
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Brand</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price$</th>
            <th style={styles.th}>Discount%</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Edit</th>
            <th style={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(p => (
            <tr key={p.id}>
              <td style={styles.td}><img style={styles.image} src={p.image} alt={p.name} /></td>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.brand}</td>
              <td style={styles.td}>{p.type}</td>
              <td style={styles.td}>{p.price}</td>
              <td style={styles.td}>{p.discount}</td>
              <td style={styles.td}>
                <span style={p.status === 'Active' ? styles.active : styles.inactive}>{p.status}</span>
              </td>
              <td style={styles.td}>
                <button style={{ ...styles.button, ...styles.editButton }} onClick={() => handleEdit(p)}>
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td style={styles.td}>
                <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(p.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.pagination}>
      <button
          style={styles.pageBtn}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<<'}
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            style={{
              ...styles.pageBtn,
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
              backgroundColor: currentPage === index + 1 ? '#4A90E2' : 'transparent',
              color: currentPage === index + 1 ? 'white' : 'black',

            }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

<button
          style={styles.pageBtn}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
            {'>'}
        </button>
      </div>
    </div>
  );
}

export default App;



