describe('Mohammed User Info', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const testingUser = {
      username: 'MKebsi',
      name: 'Mohammed Alkebsi',
      password: 'malkebsi',
    };

    cy.request('POST', 'http://localhost:3003/api/users', testingUser);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('MKebsi');
      cy.get('#password').type('malkebsi');
      cy.get('#login-button').click();

      cy.contains('Mohammed Alkebsi is logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('credentials');
      cy.get('#login-button').click();

      cy.get('.error').should('contain', 'Wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('MKebsi');
      cy.get('#password').type('malkebsi');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('World War II');
      cy.get('#author').type('Mike Jamson');
      cy.get('#url').type('http://ww2.com/history/blog/mike-on-war');

      cy.get('#create-blog-button').click();
      cy.contains('World War II Mike Jamson');
      cy.contains('show').click();
    });

    describe('User interactions on a blog', function () {
      beforeEach(function () {
        cy.contains('new blog').click();
        cy.get('#title').type('World War II');
        cy.get('#author').type('Mike Jamson');
        cy.get('#url').type('http://ww2.com/history/blog/mike-on-war');
        cy.get('#create-blog-button').click();
        cy.contains('show').click();
      });

      it('A user can like a blog', function () {
        cy.contains('likes 0');

        cy.contains('like').click();
        cy.contains('like').click();

        cy.contains('likes 1');
      });

      it('A user can delete a blog', function () {
        cy.contains('remove').click();
        cy.contains('like').click();
      });
    });
  });
});

describe('Another user interactions', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const testingUserA = {
      username: 'MKebsi',
      name: 'Mohammed Alkebsi',
      password: 'malkebsi',
    };

    const testingUserB = {
      username: 'AnotherGuy',
      name: 'Someone Interesting',
      password: 'guy7717',
    };

    cy.request('POST', 'http://localhost:3003/api/users', testingUserA);
    cy.request('POST', 'http://localhost:3003/api/users', testingUserB);

    cy.visit('http://localhost:3000');
  });

  it('Another user can not see the remove button', function () {
    // Mohammed loges in
    cy.get('#username').type('MKebsi');
    cy.get('#password').type('malkebsi');
    cy.get('#login-button').click();

    // Makes sure he is logged
    cy.contains('Mohammed Alkebsi is logged in');

    // Moahmmed creates a new blog
    cy.contains('new blog').click();
    cy.get('#title').type('World War II');
    cy.get('#author').type('Mike Jamson');
    cy.get('#url').type('http://ww2.com/history/blog/mike-on-war');
    cy.get('#create-blog-button').click();

    // Making sure the blog created by Mohammed is there
    cy.contains('World War II Mike Jamson');
    cy.contains('show').click();

    // Making sure the remove button is there
    cy.contains('remove');

    // Mohammed logs out
    cy.contains('logout').click();

    // The other guy logs in
    cy.get('#username').type('AnotherGuy');
    cy.get('#password').type('guy7717');
    cy.get('#login-button').click();

    // Making sure the other guy is logged in
    cy.contains('Someone Interesting is logged in');

    // Showing the info of Mohammed's blog
    cy.contains('show').click();

    // Making sure the remove button is not there
    cy.get('.blogs').should('not.contain', 'remove');
  });
});

describe('Blogs Order', function () {
  it('Blogs are ordered accourding to their likes', function () {
    // Adding user info
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const testingUser = {
      username: 'MKebsi',
      name: 'Mohammed Alkebsi',
      password: 'malkebsi',
    };
    cy.request('POST', 'http://localhost:3003/api/users', testingUser);
    cy.visit('http://localhost:3000');

    // Loggin
    cy.get('#username').type('MKebsi');
    cy.get('#password').type('malkebsi');
    cy.get('#login-button').click();

    // Makes sure the user is logged in
    cy.contains('Mohammed Alkebsi is logged in');

    // Add some blogs
    cy.contains('new blog').click();
    cy.get('#title').type('World War II');
    cy.get('#author').type('Mike Jamson');
    cy.get('#url').type('http://ww2.com/history/blog/mike-on-war');
    cy.get('#create-blog-button').click();

    cy.contains('new blog').click();
    cy.get('#title').type('World Web 3.0');
    cy.get('#author').type('John Jonhnson');
    cy.get('#url').type('http://www.web3.com/');
    cy.get('#create-blog-button').click();

    cy.contains('new blog').click();
    cy.get('#title').type('Deep in the Dark Night!');
    cy.get('#author').type('Batman Justuson');
    cy.get('#url').type('http://the-dark-knight.com/blog/ironics/batman');
    cy.get('#create-blog-button').click();

    // Getting the like buttons
    cy.contains('show').click();
    cy.contains('show').click();
    cy.contains('show').click();
    cy.get('.blogs').eq(0).find('.like-button').as('first-like-button');
    cy.get('.blogs').eq(1).find('.like-button').as('second-like-button');
    cy.get('.blogs').eq(2).find('.like-button').as('last-like-button');

    // Clicking the likes
    cy.wait(100);
    cy.get('@last-like-button').click();
    cy.wait(100);
    cy.get('@last-like-button').click();
    cy.get('@first-like-button').click();

    cy.wait(100);
    cy.get('@second-like-button').click();
    cy.get('@second-like-button').click();

    cy.get('.blogs').eq(0).should('contain', 'Deep in the Dark Night! Batman Justuson');
    cy.get('.blogs').eq(1).should('contain', 'World War II Mike Jamson');
    cy.get('.blogs').eq(2).should('contain', 'World Web 3.0 John Jonhnson');
  });
});
