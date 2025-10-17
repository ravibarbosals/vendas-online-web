import { Tooltip } from "antd";
import { ProductType } from "../../../shared/components/types/ProductType";

interface TooltipImageProps {
    product: ProductType
}

const TooltipImage = ({ product }: TooltipImageProps) => {

    return (
        <Tooltip title={product.name}>
            <span>{product.id}</span>
        </Tooltip>
    );
};

export default TooltipImage;