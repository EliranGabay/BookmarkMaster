import Server from "./server";

class CategoriesService extends Server{

    constructor() {
        super(null);
        this.url = `/categories`;
      }

    getCategories = async () => {
        return await this.createRequest(
          `${this.url}`,
          this.GET,
        );
    };

    addCategory = async (values) => {
      return await this.createRequest(
        `${this.url}`,
        this.POST,
        values,
      );
    };

    deleteCategory = async (value) => {
      return await this.createRequest(
        `${this.url}/${value}`,
        this.DELETE,
      );
    };
};

export default new CategoriesService();
