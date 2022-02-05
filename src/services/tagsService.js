import Server from "./server";

class TagsService extends Server{

    constructor() {
        super(null);
        this.url = `/tags`;
      }

    getTags = async () => {
        return await this.createRequest(
          `${this.url}`,
          this.GET,
        );
    };

};

export default new TagsService();