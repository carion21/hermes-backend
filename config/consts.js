
class Consts {
    static PORT_SYSTEM = 8000
    static APP_NAME = "Hermes-Backend"
    static APP_AUTHOR = "AmazonGirl"

    static NLIMIT = 10;

    static HERMES_AI_URL = "http://localhost:5000";

    static USERPROFILE_TYPE_UNDEFINED = 0;
    static USERPROFILE_TYPE_ADMIN = 1;
    static USERPROFILE_TYPE_OPERATOR = 2;
    static USERPROFILE_TYPE_CLIENT = 3;

    static USERPROFILE_TYPES = [
        {
            label: "admin",
            description: "admin User"
        },
        {
            label: "operator",
            description: "operator User"
        },
        {
            label: "client",
            description: "client User"
        }
    ];

    static DEFAULT_USER_CONFIRMATION_EXPIRATION = 3; // months
    static DEFAULT_USER_RESET_EXPIRATION = 15; // minutes

    static DEFAULT_DESC_APIKEY_BACKOFFICE = "BackOffice System API Key";
    static DEFAULT_VALUE_APIKEY_BACKOFFICE = "8DNICBX4JBMY89FATTZJ1FTDEOR2QFQN";
    static DEFAULT_PASSWORD_BACKOFFICE = "12345678";

    static DEFAULT_DESC_APIKEY_MOBILE = "Mobile System API Key";
    static DEFAULT_VALUE_APIKEY_MOBILE = "XRKHP9FQIZZ0EQKPOBD0GI4C4X9LAKJ9";
    static DEFAULT_PASSWORD_MOBILE = "12345678";

    static DEFAULT_MESSAGE_USER_SYSTEM = 0;
    static DEFAULT_MESSAGE_USER_CLIENT = 1;

    static DEFAULT_ADMINS = [
        {
            username: "admin@hermes.com",
            password: "12345678",
            firstname: "Admin",
            lastname: "Hermes"
        }
    ]

    static JWT_SECRET = "VGGBWGEPVXSVSQO9FQGLP6HJTZQNPJ3F";
    static JWT_EXPIRATION = "24h";

    static DEFAULT_TYPES = [
        "string",
        "string_not_empty",
        "string_email",
        "string_date",
        "number",
        "integer",
        "boolean",
        "object",
        "array",
        "array_of_string",
        "array_of_number",
        "array_of_integer",
        "array_of_boolean",
        "array_of_object"
    ];

    static REQUEST_STATUS_SUBMITTED = 0;
    static REQUEST_STATUS_BEING_PROCESSED = 1;
    static REQUEST_STATUS_AWAITING_CLIENT = 2;
    static REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED = 3;
    static REQUEST_STATUS_RESOLVED_AND_EVALUATED = 4;
    static REQUEST_STATUS_NOT_RESOLVED = 5;

    static REQUEST_STATUSES = [
        Consts.REQUEST_STATUS_SUBMITTED,
        Consts.REQUEST_STATUS_BEING_PROCESSED,
        Consts.REQUEST_STATUS_AWAITING_CLIENT,
        Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED,
        Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED,
        Consts.REQUEST_STATUS_NOT_RESOLVED
    ];

    static OPERATOR_REQUEST_STATUSES_STEPS = {
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: [
            Consts.REQUEST_STATUS_SUBMITTED
        ],
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED
        ],
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED,
            Consts.REQUEST_STATUS_AWAITING_CLIENT
        ],
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: [
            Consts.REQUEST_STATUS_BEING_PROCESSED,
            Consts.REQUEST_STATUS_AWAITING_CLIENT
        ]
    };


    static CLIENT_REQUEST_STATUSES_STEPS = {
        [Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED]: [
            Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED
        ]
    };

    static REQUEST_STATUSES_LABELS_EN = {
        [Consts.REQUEST_STATUS_SUBMITTED]: "Submitted",
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: "Being processed",
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: "Awaiting client",
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: "Resolved and not evaluated",
        [Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED]: "Resolved and evaluated",
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: "Not resolved"
    }

    static REQUEST_STATUSES_LABELS_FR = {
        [Consts.REQUEST_STATUS_SUBMITTED]: "Soumise",
        [Consts.REQUEST_STATUS_BEING_PROCESSED]: "En cours de traitement",
        [Consts.REQUEST_STATUS_AWAITING_CLIENT]: "En attente du client",
        [Consts.REQUEST_STATUS_RESOLVED_AND_NOT_EVALUATED]: "Résolue et non évaluée",
        [Consts.REQUEST_STATUS_RESOLVED_AND_EVALUATED]: "Résolue et évaluée",
        [Consts.REQUEST_STATUS_NOT_RESOLVED]: "Non résolue"
    }

    static REQUEST_STATUSES_LABELS = Consts.REQUEST_STATUSES_LABELS_FR;

    static REQUEST_TYPE_STEP_1 = 1;
    static REQUEST_TYPE_STEP_2 = 2;
    static REQUEST_TYPE_STEP_3 = 3;

    static REQUEST_TYPES = [
        Consts.REQUEST_TYPE_STEP_1,
        Consts.REQUEST_TYPE_STEP_2,
        Consts.REQUEST_TYPE_STEP_3
    ];

    static REQUEST_TYPES_LABELS_EN = {
        [Consts.REQUEST_TYPE_STEP_1]: "Step 1",
        [Consts.REQUEST_TYPE_STEP_2]: "Step 2",
        [Consts.REQUEST_TYPE_STEP_3]: "Step 3"
    }

    static REQUEST_TYPES_LABELS_FR = {
        [Consts.REQUEST_TYPE_STEP_1]: "Etape 1",
        [Consts.REQUEST_TYPE_STEP_2]: "Etape 2",
        [Consts.REQUEST_TYPE_STEP_3]: "Etape 3"
    }

    static REQUEST_TYPES_LABELS = Consts.REQUEST_TYPES_LABELS_FR;

    static SERVICE_TYPES = [
        "undefined", 
        "security_sign_in",
        "security_sign_out",
        "admin_new_stage",
        "admin_update_stage",
        "admin_view_stage",
        "admin_enable_stage",
        "admin_disable_stage",
        "admin_delete_stage",
        "admin_request_list_by_stage",
        "admin_new_operator",
        "admin_update_operator",
        "admin_view_operator",
        "admin_enable_operator",
        "admin_disable_operator",
        "admin_delete_operator",
        "admin_reset_operator_password",
        "admin_request_list_by_operator",
        "admin_new_client",
        "admin_update_client",
        "admin_view_client",
        "admin_enable_client",
        "admin_disable_client",
        "admin_delete_client",
        "admin_reset_client_password",
        "admin_request_list_by_client",
        "admin_view_request",
        "operator_update_request",
        "operator_view_request",
        "operator_enable_request",
        "operator_disable_request",
        "operator_delete_request",
        "operator_message_list_by_request",
        "operator_view_client",
        "client_new_request",
        "client_update_request",
        "client_view_request",
        "client_message_list_by_request",
        "client_new_message"
    ];

    static SERVICE_TYPES_FIELDS = {
        "undefined": {},
        "security_sign_in": {
            "fields": ["username", "password"],
            "types": ["string", "string"],
            "required": ["username", "password"]
        },
        "security_sign_out": {
            "fields": ["usertoken"],
            "types": ["string"],
            "required": ["usertoken"]
        },
        "admin_new_stage": {
            "fields": ["parent_stage_id", "label", "description"],
            "types": ["integer", "string", "string"],
            "required": ["label"]
        },
        "admin_update_stage": {
            "fields": ["stage_id", "label", "description"],
            "types": ["integer", "string", "string"],
            "required": ["stage_id", "label"]
        },
        "admin_view_stage": {
            "fields": ["stage_id"],
            "types": ["integer"],
            "required": ["stage_id"]
        },
        "admin_enable_stage": {
            "fields": ["stage_id"],
            "types": ["integer"],
            "required": ["stage_id"]
        },
        "admin_disable_stage": {
            "fields": ["stage_id"],
            "types": ["integer"],
            "required": ["stage_id"]
        },
        "admin_delete_stage": {
            "fields": ["stage_id"],
            "types": ["integer"],
            "required": ["stage_id"]
        },
        "admin_request_list_by_stage": {
            "fields": ["stage_id"],
            "types": ["integer"],
            "required": ["stage_id"]
        },
        "admin_new_operator": {
            "fields": ["username", "password", "firstname", "lastname", "email", "phone"],
            "types": ["string", "string", "string", "string", "string_email", "string"],
            "required": ["username", "password", "firstname", "lastname", "email", "phone"]
        },
        "admin_update_operator": {
            "fields": ["operator_id", "username", "firstname", "lastname", "email", "phone"],
            "types": ["integer", "string", "string", "string", "string", "string"],
            "required": ["operator_id", "username", "firstname", "lastname", "email", "phone"]
        },
        "admin_view_operator": {
            "fields": ["operator_id"],
            "types": ["integer"],
            "required": ["operator_id"]
        },
        "admin_enable_operator": {
            "fields": ["operator_id"],
            "types": ["integer"],
            "required": ["operator_id"]
        },
        "admin_disable_operator": {
            "fields": ["operator_id"],
            "types": ["integer"],
            "required": ["operator_id"]
        },
        "admin_delete_operator": {
            "fields": ["operator_id"],
            "types": ["integer"],
            "required": ["operator_id"]
        },
        "admin_reset_operator_password": {
            "fields": ["operator_id"],
            "types": ["integer"],
            "required": ["operator_id"]
        },
        "admin_request_list_by_operator": {
            "fields": ["operator_id"],
            "types": ["integer"],
            "required": ["operator_id"]
        },
        "admin_new_client": {
            "fields": ["username", "password", "firstname", "lastname", "email", "phone"],
            "types": ["string", "string", "string", "string", "string_email", "string"],
            "required": ["username", "password", "firstname", "lastname", "email", "phone"]
        },
        "admin_update_client": {
            "fields": ["client_id", "username", "firstname", "lastname", "email", "phone"],
            "types": ["integer", "string", "string", "string", "string", "string"],
            "required": ["client_id", "username", "firstname", "lastname", "email", "phone"]
        },
        "admin_view_client": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "admin_enable_client": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "admin_disable_client": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "admin_delete_client": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "admin_reset_client_password": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "admin_request_list_by_client": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "admin_view_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "operator_update_request": {
            "fields": ["request_id", "request_status"],
            "types": ["integer", "integer"],
            "required": ["request_id", "request_status"]
        },
        "operator_view_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "operator_enable_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "operator_disable_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "operator_delete_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "operator_message_list_by_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "operator_view_client": {
            "fields": ["client_id"],
            "types": ["integer"],
            "required": ["client_id"]
        },
        "client_new_request": {
            "fields": ["main_stage_id", "description"],
            "types": ["integer", "string"],
            "required": ["main_stage_id"]
        },
        "client_update_request": {
            "fields": ["request_id", "request_status"],
            "types": ["integer", "integer"],
            "required": ["request_id", "request_status"]
        },
        "client_view_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "client_message_list_by_request": {
            "fields": ["request_id"],
            "types": ["integer"],
            "required": ["request_id"]
        },
        "client_new_message": {
            "fields": ["request_id", "content"],
            "types": ["integer", "string"],
            "required": ["request_id", "content"]
        },
    };
}

module.exports = Consts;