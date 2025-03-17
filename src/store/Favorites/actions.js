export function addToFav(product){

    return{
        type: "ADD_TO_FAVORITES",
        payload: product
    };
    
    }
    export function removeFromFav(productId){
    
        return{
            type: "REMOVE_FROM_FAVORITES",
            payload: productId
        };
        
        }