"use client";
import { Discount } from "../Columns";
import DeleteForm from "./Delete";
import EditForm from "./Edit";

export interface RowActionsProps {
    discount: Discount;
}

const RowActions = ({ discount }: RowActionsProps) => {
    return (
        <div className="flex justify-start gap-2">
            <EditForm discount={discount} />

            <DeleteForm discount={discount} />
        </div>
    );
};

export default RowActions;
