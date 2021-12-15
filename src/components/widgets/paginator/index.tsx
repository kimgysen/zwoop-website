import React from "react";
import s from "./index.module.scss";
import {generateNumbers} from "@components/widgets/paginator/lib";
import Link from "next/link";


export type Pageable = {
    perPage: number,
    activePage: number,
    totalNrPages: number,
}

interface PaginatorProps {
    pageable: Pageable
}


export const Paginator: React.FC<PaginatorProps> = ({ pageable: { totalNrPages, activePage } }) => {
    const pages = generateNumbers(totalNrPages);

    return (
      <div className={` ${ s.paginator } clearfix`}>
        <div className={ s['hint-text'] }>Showing <b>5</b> out of <b>{ totalNrPages }</b> entries</div>
        <ul className={` ${ s.pagination } pagination`}>
            <li className={`
                page-item 
                ${ activePage === 0 ? s.disabled : '' }`}>
                <a href="#">Previous</a>
            </li>

            {
                pages.map(
                    pageNr =>
                        <li key={`page-${ pageNr }`} className={`${ pageNr === activePage ? s.active : '' } page-item`}>
                            <Link href={{ pathname: `/admin/sectors-industries/sectors-crud/${ pageNr }`}}>
                                <a
                                   className={`page-link`}
                                >{ pageNr }</a>
                            </Link>
                        </li>

                )
            }
          <li className="page-item"><a href="#" className="page-link">Next</a></li>
        </ul>
      </div>
  );
}
