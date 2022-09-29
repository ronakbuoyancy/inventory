class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchProduct() {
     const keyword = this.queryStr.keyword
      ? {
          product_name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  searchCustomer() {
    const keyword = this.queryStr.keyword
      ? {
          shop_name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter(){
  //   const queryCopy = {...this.queryStr};

  //   const removeFields = ["keyword", "page", "limit"];

  //   removeFields.forEach((key)=>delete queryCopy[key]);

  //   let queryStr = JSON.stringify(queryCopy);

  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)

  //   this.query = this.query.find(JSON.parse(queryStr));
  //   return this;
  // }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
