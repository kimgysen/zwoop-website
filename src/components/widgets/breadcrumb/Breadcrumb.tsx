import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

import {FC} from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/all";


export type BreadcrumbItemType = {
    id: string,
    label: string,
    href: string
}

interface IBreadcrumb {
    breadcrumbItems: BreadcrumbItemType[],
    activeId: string
}

const BreadcrumbWidget: FC<IBreadcrumb> = ({ breadcrumbItems, activeId }) => {
    return (
        <Breadcrumb spacing="8px"
                    separator={<BiChevronRight color="gray.300" name="chevron-right" />}
        >
            {
                breadcrumbItems.map(item =>
                    <BreadcrumbItem key={ item.id } isCurrentPage={ item.id === activeId } color={ item.id === activeId ? 'black': 'gray'} >
                        <BreadcrumbLink as={ Link } to={ item.href }>
                            { item.label }
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )
            }
        </Breadcrumb>
    )

}

export default BreadcrumbWidget;

