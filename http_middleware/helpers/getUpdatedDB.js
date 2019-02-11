export default function getUpdatedDB(allData, product) {
    let lastReviewId = allData.lastReviewId;
    let lastProjectId = allData.lastProjectId;

    const newProductReviews = product.reviews
        ? product.reviews.map((review) => ({
              ...review,
              id: ++lastReviewId,
          }))
        : [];

    const newProduct = {
        ...product,
        id: ++lastProjectId,
        review_ids: newProductReviews.map((review) => review.id),
        reviews: undefined,
    };

    const newAllData = {
        ...allData,
        lastProjectId,
        lastReviewId,
    };

    newAllData.products.push(newProduct);
    newAllData.reviews.push(...newProductReviews);

    return newAllData;
}
