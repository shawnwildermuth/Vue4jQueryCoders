var app = new Vue({
  el: "#w",
  data: {
    isBusy: false,
    userName: "",
    error: "",
    user: null
  },
  methods: {
    onSubmit: function () {
      if (this.userName) { // user has put a user name in
        // URIs
        var requri = `https://api.github.com/users/${this.userName}`;
        var repouri = `https://api.github.com/users/${this.userName}/repos`;

        this.isBusy = true;
        $.getJSON(requri)
          .done((json) => {
            // Ensure we have a name
            if (!json.name) json.name = json.login;
            this.user = json; // just bind to the data

            this.isBusy = true;
            $.getJSON(repouri)
              .done(repos => Vue.set(this.user, "repos", repos))
              .catch(() => this.error = "Failed to load repos")
              .always(() => this.isBusy = false);
          })
          .catch(() => this.error = "Failed to load data")
          .always(() => this.isBusy = false);
      };
    }
  }
});
