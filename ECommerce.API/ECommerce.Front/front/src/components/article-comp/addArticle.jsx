import styles from "../../styles/addArticle.css";

function AddArticle() {
  return (
    <>
      <div className="article-wrapper">
        <h2>Create new article</h2>
        <div className="form-wrapper">
          <form method="post">
            <table>
              <tbody>
                <tr>
                  <th>Title:</th>
                  <td>
                    <input type="text" name="title" />
                  </td>
                </tr>
                <tr>
                  <th>Price:</th>
                  <td>
                    <input type="number" name="price" />
                  </td>
                </tr>
                <tr>
                  <th>Quantity:</th>
                  <td>
                    <input type="number" name="quantity" />
                  </td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td>
                    <textarea></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddArticle;
