export const initialState = {
	products: [],
};

export function cartReducer(state, action) {
	console.log(action);
	switch (action.type) {
		case "ADD_TO_CART": {
			let updatedProducts;
			let newState;
		const foundProduct = state.products.find((product) => {
				return product.id === action.payload.id;
			});
			if (foundProduct) {
			updatedProducts = state.products.map((product) => {
					if (foundProduct.id === product.id) {
						return {
							...product,
							quantity: product.quantity + 1,
						};
					} else {
						return product;
					}
				});
				
			} else {
				updatedProducts = [
					...state.products,
					{
						...action.payload,
						quantity: 1,
					},
				];
			}
			newState = {
				products: updatedProducts,
			};
			return newState;
		}
		case "REMOVE_FROM_CART": {
			const filteredProducts = state.products.filter((product) => {
				return product.id !== action.payload;
			});
		const newState = {
				products: filteredProducts,
			};
			return newState;
		}
		default:
			return state;
	}
}