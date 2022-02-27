import React from "react";

export const UserData = ({ u,idx }) => {
    return (

        // <tr>
        //     <th scope="row">1</th>
        //     <td>Mark</td>
        //     <td>Otto</td>
        //     <td>@mdo</td>
        // </tr>

        <tr >
            <th scope="row">{idx + 1}</th>
            <td><img src={u.picture.thumbnail} /></td>
            <td>{`${u.name.first} ${u.name.last}`}</td>
            <td>{u.email}</td>
        </tr>

    )
}