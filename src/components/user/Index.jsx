import React, { useMemo } from "react";
import { useEffect } from "react";
import { UserData } from "./UserData";


export const Index = ({ headers }) => {
    const [users, setUser] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const [itemsPerPage, setItemsPerPage] = React.useState(10)
    const [search, setSearch] = React.useState(null)
    const [sortField, setSortField] = React.useState()
    const [sortOrder, setSortOrder] = React.useState('asc')




    useEffect(() => {
        fetch('https://randomuser.me/api/?results=101').then(res => res.json()).then(({ results }) => {

            setUser(results)
        })
    }, [])

    useEffect(() => {
        const userLength = search !== null ? users.filter((u) => u.name.first.trim().toLowerCase().includes(search.trim().toLowerCase())).length : users.length

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


    const sortHandler = (head) => {
        if (head.sortable) {
            setSortField(head.id)
            setSortOrder(
                sortOrder === 'asc' ? 'desc' : 'asc'
            )
        setCurrentPage(1)

        }

    }

    // console.log(sortField);

    const computedUsers = useMemo(() => {
        let computed = users

        if (search) {
            computed = computed.filter((u) => u.name.first.trim().toLowerCase().includes(search.trim().toLowerCase()))
        }

        if (sortField) {
            computed = computed.sort((a, b) => {
                const isReversed = sortOrder === 'asc' ? 1 : -1
                const compareResult = a.name['first'].localeCompare(b.name['first'])
                // console.log(compareResult);
                // console.log(a.name.first);
                // console.log(b.name.first);

                return compareResult * isReversed
            })
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
            search,
            sortField,
            sortOrder

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
                                className={`${head.sortable && "bg bg-success"}`}
                                onClick={() => sortHandler(head)}
                                key={head.id}
                                scope="col">
                                {head.label}
                                {head.sortable && (sortOrder === 'asc' ? '↓' : '↑')}


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