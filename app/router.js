import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function ()
{
  this.route('login', {
      path: '/'
  });

  this.route('register');
  this.route('forgot-password');
  this.route('profile');
  this.route('hearing');

  this.route('actor', function ()
  {
      this.route('index', {
          path: '/'
      });

      this.route('casting', function ()
      {
          this.route('matched');
          this.route('upcoming');
          this.route('accepted');
          this.route('won');
          this.route('archived');

      });

      this.route('favourite');
      this.route('invitation', {
          path: ':id/invitation'
      });
      this.route('detail', {
          path: 'detail/:id'
      });
      this.route('report', {
          path: 'report/:actorId/:castingId'
      });
  });

  this.route('message', function ()
  {
      this.route('index', {
          path: '/'
      });
      this.route('new', {
          path: 'new/:user_id'
      });
      this.route('detail', {
          path: 'detail/:id'
      });
      this.route('reply', {
          path: 'reply/:id/'
      });
  });

  this.route('invite', function ()
  {
      this.route('index', {
          path: '/'
      });

  });

  this.route('notification', function ()
  {
      this.route('index', {
          path: '/'
      });
      this.route('new');
      this.route('detail');
  });

  this.route('invitation', function ()
  {
      this.route('index', {
          path: '/'
      });
      this.route('new');
  });

  this.route('casting', function ()
  {
      this.route('index', {
          path: '/'
      });
      this.route('edit', {
          path: 'edit/:id'
      });
      this.route('actors', {
          path: 'actors/:id'
      });
      this.route('detail');
      this.route('archive');
      this.route('invitation');
      this.route('apply');
      this.route('new');
  });

  this.route('role', function ()
  {
      this.route('apply', {
          path: '/:id/apply'
      });
  });

  this.route('appointment', function ()
  {
      this.route('index', {
          path: '/'
      });
      this.route('detail', {
          path: 'detail/:roleId/:actorId/:appointmentId/:hearingId'
      });
  });

  this.route('agent', function ()
  {
      this.route('actor', function ()
      {
          this.route('matched');
          this.route('casting', function() {
            this.route('actors');
          });
      });

      this.route('actor.role', {path: '/actor/role'});
      this.route('actor.invite', {path: '/actor/invite'});
      this.route('actor.add', {path: '/actor/add'});
  });

  this.route('component', function ()
  {
  });

  this.route('components', function ()
  {
      this.route('matched-content');
  });

  this.route('legal', function() {
    this.route('notice', {path: '/notice'});
  });
});

export default Router;
