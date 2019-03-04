function combineProductsAndReviews(products, reviews) {
    return products.map((product) => {
        const productReviewIds = product.review_ids;
        const productReviews = reviews.filter((review) =>
            productReviewIds.includes(review.id)
        );
        return {
            ...product,
            reviews: productReviews,
            review_ids: undefined,
        };
    });
}

export default combineProductsAndReviews;
