import DS from 'ember-data';
import attr from 'ember-data/attr';

/**
 * Notification kind hash
 *
 * @type {Object}
 */
const NotificationKind = {

	DEFAULT: {
		value: '',
		class: 'info-circle'
	},
	ROLE_NEW_MATCH: {
		value: 'role_new_match',
		class: 'hand-o-right'
	},
	ROLE_APPOINTMENT_APPROVED: {
		value: 'role_appointment_approved',
		class: 'calendar-check-o'
	},
	ROLE_APPOINTMENT_REJECTED: {
		value: 'role_appointment_rejected',
		class: 'calendar-times-o'
	},
	ROLE_QUALIFIED: {
		value: 'role_qualified',
		class: 'thumbs-o-up'
	},
	ROLE_REJECTED: {
		value: 'role_rejected',
		class: 'thumbs-o-down'
	},
	CASTING_CANCELED: {
		value: 'casting_canceled',
		class: 'ban'
	},
	ACTOR_ADDED_TO_FAVOURITES: {
		value: 'actor_added_to_favourites',
		class: 'star-o'
	},
	ACTOR_VISITED_BY_CASTING_COMPANY: {
		value: 'actor_visited_by_casting_company',
		class: 'eye'
	},
	ACTOR_MEDIA_OUTDATED: {
		value: 'actor_media_outdated',
		class: 'calendar-o'
	},
	ACTOR_APPLIED_TO_HEARING: {
		value: 'actor_applied_to_hearing',
		class: 'check-square-o'
	},
	ACTOR_CANCELED_HEARING: {
		value: 'actor_canceled_hearing',
		class: 'ban'
	},
	ACTOR_CANCELED_ROLE: {
		value: 'actor_canceled_role',
		class: 'ban'
	}

};

export default DS.Model.extend(NotificationKind, {

	title: attr (),
	body: attr (),
	createdAt: attr ('date'),
	kind: attr (),
	read: attr (),
	referenceHref: attr (),
	roleId: attr (),
	castingName: attr(),

	isRejected: Ember.computed('kind', function ()
	{
		return (
			this.get('kind') === NotificationKind.ROLE_REJECTED.value ||
				this.get('kind') === NotificationKind.CASTING_CANCELED.value ||
					this.get('kind') === NotificationKind.ACTOR_CANCELED_HEARING.value ||
						this.get('kind') === NotificationKind.ACTOR_CANCELED_ROLE.value
		);
	}),

	icon: Ember.computed('kind', function ()
	{
		let className = NotificationKind.ROLE_NEW_MATCH.class;

		switch (this.get('kind')) {

			case NotificationKind.ROLE_NEW_MATCH.value:
				className = NotificationKind.ROLE_NEW_MATCH.class;
				break;

			case NotificationKind.ROLE_APPOINTMENT_APPROVED.value:
				className = NotificationKind.ROLE_APPOINTMENT_APPROVED.class;
				break;

			case NotificationKind.ROLE_APPOINTMENT_REJECTED.value:
				className = NotificationKind.ROLE_APPOINTMENT_REJECTED.class;
				break;

			case NotificationKind.ROLE_QUALIFIED.value:
				className = NotificationKind.ROLE_QUALIFIED.class;
				break;

			case NotificationKind.ROLE_REJECTED.value:
				className = NotificationKind.ROLE_REJECTED.class;
				break;

			case NotificationKind.CASTING_CANCELED.value:
				className = NotificationKind.CASTING_CANCELED.class;
				break;

			case NotificationKind.ACTOR_ADDED_TO_FAVOURITES.value:
				className = NotificationKind.ACTOR_ADDED_TO_FAVOURITES.class;
				break;

			case NotificationKind.ACTOR_VISITED_BY_CASTING_COMPANY.value:
				className = NotificationKind.ACTOR_VISITED_BY_CASTING_COMPANY.class;
				break;

			case NotificationKind.ACTOR_MEDIA_OUTDATED.value:
				className = NotificationKind.ACTOR_MEDIA_OUTDATED.class;
				break;

			case NotificationKind.ACTOR_APPLIED_TO_HEARING.value:
				className = NotificationKind.ACTOR_APPLIED_TO_HEARING.class;
				break;

			case NotificationKind.ACTOR_CANCELED_HEARING.value:
				className = NotificationKind.ACTOR_CANCELED_HEARING.class;
				break;

			case NotificationKind.ACTOR_CANCELED_ROLE.value:
				className = NotificationKind.ACTOR_CANCELED_ROLE.class;
				break;

			default:
				className = NotificationKind.DEFAULT.class;
				break;
		}

		return className;

	}),

	isRoleApply: Ember.computed('kind', function ()
	{
		return (this.get('kind') === NotificationKind.ROLE_NEW_MATCH.value);

	})

});
