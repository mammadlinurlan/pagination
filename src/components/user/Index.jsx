import React, { useMemo } from "react";
import { useEffect } from "react";
import { UserData } from "./UserData";


export const Index = ({ headers }) => {
    const [users, setUser] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const [itemsPerPage, setItemsPerPage] = React.useState(10)
    const [search, setSearch] = React.useState(null)




    useEffect(() => {
        fetch('https://randomuser.me/api/?results=101').then(res => res.json()).then(({ results }) => {

            setUser(results)
        })
    }, [])

    useEffect(() => {
        const userLength = search !== null ? users.filter((u)=> u.name.first.trim().toLowerCase().includes(search.trim().toLowerCase())).length : users.length

        let tp = Math.ceil(userLength / itemsPerPage)
        setTotalPage(tp)
    },
        [users,
            itemsPerPage,
            search
        ]
    )

    const perPageHangler = (e) => {
        setItemsPerPage(parseInt(e.target.value))
        setCurrentPage(1)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    let searchValue;

    const searchHandler = (e) => {
        searchValue = e.target.value
        console.log(searchValue)
    }
    

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        setSearch(searchValue)
        setCurrentPage(1)
    }

    const computedUsers = useMemo(() => {
        let computed = users

        if(search){
            computed = computed.filter((u)=> u.name.first.trim().toLowerCase().includes(search.trim().toLowerCase()))
        }

        computed = computed.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        )
        return computed
    },
        [
            users,
            itemsPerPage,
            currentPage,
            search
        ]
    )




    return (

        <div className="container">
            <form onSubmit={searchSubmitHandler}>
            <input
                className="form-group"
                onChange={searchHandler}
            />
            <button className="btn btn-primary" type="submit" >SEARCH</button>
            </form>
           
            <select onChange={perPageHangler} value={itemsPerPage} className="form-select" aria-label="Default select example">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((head) => {
                            return <th
                                key={head.id}
                                scope="col">
                                {head.label}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>

                    {computedUsers.map((u, idx) => {
                        return <UserData
                            key={u.login.uuid}
                            u={u}
                            idx={idx + (currentPage - 1) * itemsPerPage}
                        />
                    })}
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}><button className={`page-link`} onClick={() => handlePageChange(currentPage - 1)}>Previous</button></li>
                    {[...Array(totalPage).keys()].map((num) => {
                        return <li key={num} className={`page-item ${num + 1 === currentPage && 'active'}`}><button className={`page-link `} onClick={() => handlePageChange(num + 1)}>{num + 1}</button></li>

                    })}
                    <li className={`page-item ${currentPage === totalPage && "disabled"}`}><button className={`page-link`} onClick={() => handlePageChange(currentPage + 1)}>Next</button></li>

                </ul>
            </nav>


        </div>
    )
}