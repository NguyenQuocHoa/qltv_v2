// import React from 'react';
// import { Table } from 'reactstrap';
// import axios from 'axios';

// export default class TableExample extends React.Component {
//   componentDidMount() {
//     console.log("Com did");
//     axios.get('http://localhost:6165/api/user')
//       .then((res) => {
//         console.log(res.data);
//       })
//   }
//   render() {
//     return (
//       <Table className="mb-0">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Username</th>
//           </tr>
//         </thead>
//         <tbody>
//           { }
//           <tr>
//             <th scope="row">1</th>
//             <td>Mark</td>
//             <td>Otto</td>
//             <td>@mdo</td>
//           </tr>
//           {/* <tr>
//             <th scope="row">2</th>
//             <td>Jacob</td>
//             <td>Thornton</td>
//             <td>@fat</td>
//           </tr>
//           <tr>
//             <th scope="row">3</th>
//             <td>Larry</td>
//             <td>the Bird</td>
//             <td>@twitter</td>
//           </tr> */}
//         </tbody>
//       </Table>
//     );
//   }
// }


import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

function TableExample() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get('user')
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data)
        }
        else {
          console.log("Server error");
        }
      })
  });

  return (
    <Table className="mb-0">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        { userList.map(user => {
          return <tr key={user.id}>
            <th>{user.id}</th>
            <td>{user.userName}</td>
            <td>{user.password}</td>
          </tr>
        }) }
      </tbody>
    </Table> 
  )
}

export default TableExample;
