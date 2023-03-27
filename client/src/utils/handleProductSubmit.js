function handleProductSubmit({ id, name, price, description, categories, selectedCategories, images, product, setOpen, navigate }) {
  const formData = {name: name, price: parseFloat(price), description: description}

  // makes sure to grab the category from db and no duplicates
  const doubleCheckCategories = selectedCategories.map((selected) => {
      const findCategory = categories.find((category) => category.name === selected.name)
      if (findCategory) return findCategory
      else return selected
  }).filter((value, index, array) => array.indexOf(value) === index)

  if(id) {
      fetch(`/products/${id}"`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      })
      .then((r) => {
          if(r.ok) {
              r.json().then((data) => {
                  if(selectedCategories.length > 0 || doubleCheckCategories.length > 0) {
                      // adds to db if in form and not in db
                      const newCategories = doubleCheckCategories.filter((category) => {
                          const match = product.product_categories.find((product_category) => product_category.category.name === category.name)
                          return (
                              match ? null : category
                          )
                      }).flat()

                      newCategories.map((category) => {
                          return (
                              fetch("/product_categories", {
                                  method: "POST",
                                  headers: {
                                      "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({category_id: category.id, product_id: data.id})
                              })
                              .then((r) => r.json())
                              .then((data) => console.log(data))
                          )
                      })

                      // removes from db if in db and not in form
                      const removeCategories = product.product_categories.filter((category) => {
                          const match = selectedCategories.find((product_category) => product_category.name === category.category.name)
                          return (
                              match ? null : category
                          )
                      }).flat()

                      removeCategories.map((category) => {
                          return (
                              fetch(`/product_categories/${category.id}`, {
                                  method: "DELETE",
                                  headers: {
                                      "Content-Type": "application/json"
                                  }
                              })
                          )
                      })
                  }

                  if(images.length > 0) {
                      // adds to db if in form and not in db
                      const newImages = images.filter((image) => {
                          const match = product.images.find((product_image) => product_image.url === image.url)
                          return (
                              match ? null : image
                          )
                      }).flat()

                      newImages.map((image) => {
                          return (
                              fetch("/images", {
                                  method: "POST",
                                  headers: {
                                      "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({url: image.url, product_id: data.id})
                              })
                              .then((r) => r.json())
                              .then((data) => console.log(data))
                          )
                      })

                      // removes from db if in db and not in form
                      const removeImages = product.images.filter((image) => {
                          const match = images.find((product_image) => product_image.url === image.url)
                          return (
                              match ? null : image
                          )
                      }).flat()

                      removeImages.map((image) => {
                          return (
                              fetch(`/images/${image.id}`, {
                                  method: "DELETE",
                                  headers: {
                                      "Content-Type": "application/json"
                                  }
                              })
                          )
                      })
                  }

                  navigate(`/products/${id}`)
              })
          } else {
              r.json().then((data) => console.log(data.error))
          }
      })
  } else {
      fetch("/products", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      })
      .then((r) => {
          if(r.ok) {
              r.json().then((data) => {
                  if(selectedCategories.length > 0 || doubleCheckCategories.length > 0) {
                      doubleCheckCategories.map((category) => {
                          return (
                              fetch("/product_categories", {
                                  method: "POST",
                                  headers: {
                                      "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({category_id: category.id, product_id: data.id})
                              })
                          )
                      })
                      
                  }

                  if(images.length > 0) {
                      images.map((image) => {
                          return (
                              fetch("/images", {
                                  method: "POST",
                                  headers: {
                                      "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({url: image.url, product_id: data.id})
                              })
                              .then((r) => r.json())
                              .then((data) => console.log(data))
                          )
                      })
                  }

                  navigate("/me")
              })
          } else {
              r.json().then((data) => console.log(data.error))
          }
      })
  }

  setOpen(false)
}

export { handleProductSubmit }