module.exports = (policyArray) => {
    // console.log(policyArray);
    
   let sortedPolicies = JSON.parse(policyArray)
    .reduce((prev, cur) => {
        productType = cur.product_type
        return {

            ...prev,

            [productType]: prev[productType] ? [...prev[productType], cur] : [cur]
        }
    }, {})

    const policyKeys = Object.keys(sortedPolicies)
    for (let i = 0; i < policyKeys.length; i++) {
        let arrayElem = sortedPolicies[policyKeys[i]];
        // return arrayElem
        const bestPolicy = arrayElem.reduce((prev,cur)=>{
            return (prev.premium_monthly > cur.premium_monthly) ? prev : cur
        })
        sortedPolicies[policyKeys[i]]= bestPolicy
    }
    return sortedPolicies

}