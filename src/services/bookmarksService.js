import Server from "./server";


class BookmarksService extends Server{

    constructor() {
        super(null);
        this.url = `/bookmarks`;
      }

    getBookmarks = async (categoryId) => {
        return await this.createRequest(
          `${this.url}?categoryId=${categoryId}`,
          this.GET,
        );
      };

    addBookmark = async (values) => {
        console.log(values);
        return await this.createRequest(
          `${this.url}`,
          this.POST,
          values,
        );
      };

    deleteBookmark = async (value) => {
        return await this.createRequest(
          `${this.url}/${value}`,
          this.DELETE,
        );
      };
};

export default new BookmarksService();