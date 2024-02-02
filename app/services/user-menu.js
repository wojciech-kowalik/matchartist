import Ember from 'ember';

const Module = Ember.Object.extend({
    text: null,
    link: null,
    class: null
});

export default Ember.Service.extend({

    modules: [],
    suffix: 'Modules',
    session: Ember.inject.service(),

    init()
    {
        let role = this.get('session').get('data.authenticated').role;
        if(role === 'casting_company'){
            role = 'castingCompany';
        }
        if (!Ember.isEmpty(role)) {
          this[role + this.get('suffix')]();
        }
    },

	/**
     * Predefined actor modules
     */
    actorModules()
    {
        this.get('modules').push(
            Module.create({text: 'Profile', link: 'profile', class: 'fa-user'})
        );
        this.get('modules').push(
            Module.create({text: 'Notifications', link: 'notification', class: 'fa-bell-o'})
        );
        this.get('modules').push(
            Module.create({text: 'Invitations', link: 'invite', class: 'fa-bullhorn'})
        );
        this.get('modules').push(
            Module.create({text: 'Messages', link: 'message', class: 'fa-envelope-o'})
        );
        this.get('modules').push(
            Module.create({text: 'Upcoming castings', link: 'actor.casting.upcoming', class: 'fa-television'})
        );
        this.get('modules').push(
            Module.create({text: 'Matched castings', link: 'actor.casting.matched', class: 'fa-check-circle-o'})
        );
        this.get('modules').push(
            Module.create({text: 'Accepted castings', link: 'actor.casting.accepted', class: 'fa-paper-plane-o'})
        );
        this.get('modules').push(
            Module.create({text: 'Won castings', link: 'actor.casting.won', class: 'fa-thumbs-o-up'})
        );
        this.get('modules').push(
            Module.create({text: 'Archived castings', link: 'actor.casting.archived', class: 'fa-history'})
        );
    },

    /**
     * Predefined agent modules
     */
    agentModules()
    {
        this.get('modules').push(
            Module.create({text: 'Profile', link: 'profile', class: 'fa-user'})
        );
        this.get('modules').push(
            Module.create({text: 'Messages', link: 'message', class: 'fa-envelope-o'})
        );
        this.get('modules').push(
            Module.create({text: 'Actors', link: 'agent.actor', class: 'fa-users'})
        );
        this.get('modules').push(
            Module.create({text: 'Actors roles', link: 'agent.actor.role', class: 'fa-user-secret'})
        );
        this.get('modules').push(
            Module.create({text: 'Actors invites', link: 'agent.actor.invite', class: 'fa-bullhorn'})
        );
    },

    /**
     * Predefined casting company modules
     */
    castingCompanyModules()
    {
        this.get('modules').push(
            Module.create({text: 'Profile', link: 'profile', class: 'fa-user'})
        );
        this.get('modules').push(
            Module.create({text: 'Castings', link: 'casting', class: 'fa-calendar'})
        );
        this.get('modules').push(
            Module.create({text: 'Actors', link: 'actor', class: 'fa-users'})
        );
        this.get('modules').push(
            Module.create({text: 'Favourites', link: 'actor.favourite', class: 'fa-star'})
        );
        //this.get('modules').push(
        //    Module.create({text: 'History', link: 'profile', class: 'fa-history'})
        //);
        this.get('modules').push(
            Module.create({text: 'Messages', link: 'message', class: 'fa-envelope-o'})
        );
        this.get('modules').push(
            Module.create({text: 'Archived castings', link: 'casting.archive', class: 'fa-history'})
        );
    },

});
