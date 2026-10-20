import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'agent-api': {
                        table: 'sys_ws_definition'
                        id: 'af17ace429dc42d687af58d67ae0126c'
                    }
                    'agent-api-access-request': {
                        table: 'sys_ws_operation'
                        id: '34e44642781240b5b81ab758b8a012b9'
                    }
                    'agent-api-application': {
                        table: 'sys_ws_operation'
                        id: '2deeb5fc02be43d38728995faa70054f'
                    }
                    'agent-api-entitlements': {
                        table: 'sys_ws_operation'
                        id: 'b3501ac7ade54115b931cbc29b68bdb3'
                    }
                    'agent-api-execute': {
                        table: 'sys_security_acl'
                        id: '150425eaeba34407b0ee5a100ed741ae'
                    }
                    'agent-api-unlock': {
                        table: 'sys_ws_operation'
                        id: '1e081b5a437d420bb25d6d2e0dfa6b3a'
                    }
                    'agent-host-role-agent-api': {
                        table: 'sys_user_has_role'
                        id: '3c665de0466344f28fe76436cf3e3e3e'
                    }
                    'ai-action-create-nobody': {
                        table: 'sys_security_acl'
                        id: '0a9e3dc6bdad4971a6516b3a035105f8'
                    }
                    'ai-action-delete-nobody': {
                        table: 'sys_security_acl'
                        id: 'f604bff9e393469bba931ad5748fca36'
                    }
                    'ai-action-read-admin': {
                        table: 'sys_security_acl'
                        id: 'c6441e911f0c4778b399c9f8bdaa4bb6'
                    }
                    'ai-action-write-nobody': {
                        table: 'sys_security_acl'
                        id: 'd356bc43a9b4488bb4ee9e125c86e28b'
                    }
                    'app-clinical-sample-tracker': {
                        table: 'cmdb_ci_business_app'
                        id: '220a931f93414dfa8c07c37270eacf9c'
                    }
                    'app-etmf': {
                        table: 'cmdb_ci_business_app'
                        id: 'ea3c571fae6a480590264cab8d9404ee'
                    }
                    'app-lims-reporting-tool': {
                        table: 'cmdb_ci_business_app'
                        id: '52ff8fa2d8b54837b81e21c13f52a2be'
                    }
                    'app-tableau': {
                        table: 'cmdb_ci_business_app'
                        id: '52b194bb9905420c8d16bf93e85a8962'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '345f5f38128a4305bef7e38f4191540d'
                    }
                    'car-audit-gxp': {
                        table: 'sys_hub_action_instance_v2'
                        id: '0326d78f0f044e0b9c92d5a79c7172f3'
                    }
                    'car-audit-no-approvers': {
                        table: 'sys_hub_action_instance_v2'
                        id: '0d869d6e2150418eb9b6cbd44af4756a'
                    }
                    'car-audit-not-confirmed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '41404ff267a747769761eb670028ea03'
                    }
                    'car-audit-standard': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a5b8a12f82974e878646766a0fd81b91'
                    }
                    'car-else-no-approvers': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '4a671b22b4c24b7489b945d8012ef63c'
                    }
                    'car-else-not-confirmed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '2acbfdb3a6a14b7e951ff18130b740c3'
                    }
                    'car-elseif-gxp': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '73b76de29f4c4c9588a7f1c1a07fae22'
                    }
                    'car-gxp-set-ci': {
                        table: 'sys_hub_action_instance_v2'
                        id: '7b91665b258445c692e83097740a9ed3'
                    }
                    'car-if-confirmed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ea36df35bcb143c08eeb5060759d2643'
                    }
                    'car-if-standard': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'dd42355d0f01431692141f726540c7be'
                    }
                    'car-lookup-app': {
                        table: 'sys_hub_action_instance_v2'
                        id: '1baa3b292e974cc78dfea67654aebed7'
                    }
                    'car-out-gxp': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '69e8271cde0c41849b53b3baf797cb04'
                    }
                    'car-out-no-approvers': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'cd9c4a7baa52403d99137edee560fbc9'
                    }
                    'car-out-not-confirmed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '7489da8e48a945709078b238e9c70332'
                    }
                    'car-out-standard': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '9f237b3911e246a0a49ce46883c3a0f5'
                    }
                    'car-standard-set-ci': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a61a13b604d845fda34ccb8c59ed89d8'
                    }
                    'car-submit-gxp': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'eae0c3f1e54c4d84b3789445d7d7a5de'
                    }
                    'car-submit-standard': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3205577621a140a292004e8d11e7f1aa'
                    }
                    'cat-item-gxp-access': {
                        table: 'sc_cat_item'
                        id: '63b8a13ce4cf4800bdf24c3bebe68e30'
                    }
                    'cat-item-standard-access': {
                        table: 'sc_cat_item'
                        id: '60c5892ba8bd4ef3a8e8a10fe30c472a'
                    }
                    'check-app-audit-found': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd97b37cb62484a15ba810b8fe11ef981'
                    }
                    'check-app-else': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '538f9df62b904a4eaaff6b4267e32194'
                    }
                    'check-app-if-found': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '5847db13c2444a54b8e5487c7718b8ef'
                    }
                    'check-app-lookup': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b0f58e7a6e2d4f28b17711a1da710afe'
                    }
                    'check-app-out-found': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '1089d0c8a7ca430ea873b6b4d6c70f71'
                    }
                    'check-app-out-missing': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd9ee43b2fc6e43d0b180c4f714c1e3fa'
                    }
                    'check-ent-app': {
                        table: 'sys_hub_action_instance_v2'
                        id: '70f576317497468a95cb1c661350e620'
                    }
                    'check-ent-audit': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c9ee674da6cd4e11b1241d276bac3dba'
                    }
                    'check-ent-else': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '6a7d2734d6234f5286a08b2e612b3c00'
                    }
                    'check-ent-if-has': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ae0da85d3c50420b8918651af3426104'
                    }
                    'check-ent-lookup': {
                        table: 'sys_hub_action_instance_v2'
                        id: '8ff3a84aff184b3eaafd134439a09988'
                    }
                    'check-ent-out-has': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '27d0ee96a94640d3bcb60e520fbad024'
                    }
                    'check-ent-out-none': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'e71190c625d34dec9d2bbdeed7eea36a'
                    }
                    'entitlement-sarah-etmf': {
                        table: 'x_snc_helix_core_entitlement'
                        id: 'a790951800c44f3f9e9b0b409ee8b99e'
                    }
                    'flow-gxp-access-approval': {
                        table: 'sys_hub_flow'
                        id: '73cb1cf0ded6405cb0209f7d38996b62'
                    }
                    'flow-gxp-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: '8ada29add62d4e869d3a03da452700ac'
                    }
                    'flow-gxp-if-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd630cee2a1df40ecb55baa9d9a5de1e1'
                    }
                    'flow-gxp-lookup-app': {
                        table: 'sys_hub_action_instance_v2'
                        id: '70f30520d5a744e89f24d316e6d3f9c4'
                    }
                    'flow-gxp-provision-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6d4c11a291dc439d9c28b3a7f13373fc'
                    }
                    'flow-gxp-trigger': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: 'cfb92178a0154399a9b003b9b20feafe'
                    }
                    'flow-gxp-wait-ci': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fc25c16b2628487dba28157992747efa'
                    }
                    'flow-standard-access-approval': {
                        table: 'sys_hub_flow'
                        id: '153dadbd19b74f029588e6914ecabb16'
                    }
                    'flow-std-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: '21b04f76f3e24d9f9ddd28de5bd9e15f'
                    }
                    'flow-std-if-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '7210a125ecdd4d3791e9ad93ff1e4611'
                    }
                    'flow-std-provision-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6fdebf8fa2a947a29b099c01f7fbffa2'
                    }
                    'flow-std-trigger': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '667381717f8246b18e90846653292d6a'
                    }
                    'notify-add-comment': {
                        table: 'sys_hub_action_instance_v2'
                        id: '9b6af974365d4ac599c63fe989ba8d6c'
                    }
                    'notify-audit-executed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '843db74ae11947648f3ae06cbd0e4204'
                    }
                    'notify-audit-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'dcbac9bb12d14f5a87990a1514179a9a'
                    }
                    'notify-else-refused': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b74349ccbda745099ca63899daad2d36'
                    }
                    'notify-if-found': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a3dfa78222de42fbb25e05b24e2d2482'
                    }
                    'notify-lookup-ticket': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f3c9e126502e48e18af5aab951a561c5'
                    }
                    'notify-out-refused': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '29b3dda202d74ce89b9b1e7e9688bbdc'
                    }
                    'notify-out-success': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '607413914b554e598a6bb96f3c8902d9'
                    }
                    'ops-api': {
                        table: 'sys_ws_definition'
                        id: '37b882b45c78405485c610f2a12050a1'
                    }
                    'ops-api-execute': {
                        table: 'sys_security_acl'
                        id: '1c87f310dd954a7f981cc18c0b0f22e3'
                    }
                    'ops-api-publish-flows': {
                        table: 'sys_ws_operation'
                        id: 'a3f9abd581f6416fa24b02d91743a9fc'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'f5d4d06fb673467584eabc00b4a9deaf'
                    }
                    'src_server_agent-api_access-request_ts': {
                        table: 'sys_module'
                        id: '464bd8d9b60e4228b742ce4861b7001f'
                    }
                    'src_server_agent-api_common_ts': {
                        table: 'sys_module'
                        id: '7bf3f50dd31141c3ac832383a0e6f0de'
                    }
                    'src_server_agent-api_reads_ts': {
                        table: 'sys_module'
                        id: 'f9f051f10d8e468798b4d80e2e29e642'
                    }
                    'src_server_agent-api_unlock_ts': {
                        table: 'sys_module'
                        id: 'dcfdb19cc4e74ff9af2a98d5d99ae85a'
                    }
                    'src_server_ops_publish-flows_ts': {
                        table: 'sys_module'
                        id: '62453998ca284135b1012afed31a2b8f'
                    }
                    'subflow-check-application': {
                        table: 'sys_hub_flow'
                        id: '202546fdabae4e4580ebd2eee92f068e'
                    }
                    'subflow-check-entitlements': {
                        table: 'sys_hub_flow'
                        id: '2073b2a7ed754529901d2cf94497ea12'
                    }
                    'subflow-create-access-request': {
                        table: 'sys_hub_flow'
                        id: 'f5934dada8684d80990f1f7cae0a3734'
                    }
                    'subflow-notify-requester': {
                        table: 'sys_hub_flow'
                        id: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                    }
                    'subflow-unlock-account': {
                        table: 'sys_hub_flow'
                        id: '0dab321e35bd488b9168b23b7bae9d9a'
                    }
                    'unlock-audit-executed': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e629f23849f749cca7f0ca0b8c169988'
                    }
                    'unlock-audit-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: '55733e3b74e64f8ca7926f7b99dea8ec'
                    }
                    'unlock-clear-locked-out': {
                        table: 'sys_hub_action_instance_v2'
                        id: '4d7417e3256e4b968c2e8bf14058b22f'
                    }
                    'unlock-create-incident': {
                        table: 'sys_hub_action_instance_v2'
                        id: '7474a2e310954902ae325a70e96a8f70'
                    }
                    'unlock-else-no-mfa': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '209dc4cb520a454fa26755140770ca1c'
                    }
                    'unlock-if-mfa-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '41b14149b2ab4c6ba44d91863975fb23'
                    }
                    'unlock-out-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '234933feb89a44d79b8cdb0173c89b89'
                    }
                    'unlock-out-success': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'e099d5df735346068cbd0be2ff70df5f'
                    }
                    'user-agent-host': {
                        table: 'sys_user'
                        id: '6b02dbf235d54d8da6b8cd10af63d3ce'
                    }
                    'user-it-app-owner-jonas-weber': {
                        table: 'sys_user'
                        id: '1a6493b5335441fa8ec52a8516fba4f4'
                    }
                    'user-manager-daniel-okafor': {
                        table: 'sys_user'
                        id: '68c99a086aed40378816b0405ec58db4'
                    }
                    'user-quality-marta-lindqvist': {
                        table: 'sys_user'
                        id: '64c34f44a0cb43358392de4256f6caae'
                    }
                    'user-sarah-chen': {
                        table: 'sys_user'
                        id: 'f55f2b62e2194ce6815dce9725a81c4c'
                    }
                    'user-system-owner-priya-raman': {
                        table: 'sys_user'
                        id: '4aedf72e27d6485d8826270727d159bd'
                    }
                }
                composite: [
                    {
                        table: 'sys_hub_flow_input'
                        id: '01c5f65cad4a400ca260d5d7ee031894'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '03cfc25606494f3a8f114e2d9f945e65'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'mfa_verified'
                            value: 'denied_simulated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0451f94f77d445ba932837ea60e98b16'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'found'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '04751eda6b6841738a863afd9b92ed33'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'run_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '052622531d984315a4065d4021301b61'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_gxp_classification'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '06a8860c97714c97adec528c378b50bc'
                        key: {
                            sc_cat_item: '63b8a13ce4cf4800bdf24c3bebe68e30'
                            sc_category: '2809952237b1300054b6a3549dbe5dd4'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '07a33f795e7f448c8601b0a68b046bac'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '09a70e2e1036496cbe908dd730448e55'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a2e238db264425a9c6ee1402bad8c67'
                        key: {
                            name: 'var__m_sys_hub_flow_output_2073b2a7ed754529901d2cf94497ea12'
                            element: 'granted_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0be020e691b442a0a82d63f5c5d2afb9'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '0c8ea28264cc4d26a34a41634e1d0678'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '0fa733ddea0148a392fb11518324833f'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '11565f729c4a4fcd8dd8db32ca71fe9e'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'audit_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1236c7b519434d668d5c8fd7e09aa67d'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_gxp_classification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '12c219170a584bfe9a97ceb14b47986f'
                        key: {
                            logical_table_name: 'x_snc_helix_core_entitlement'
                            col_name_string: 'user,application'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '12c9d4ae36d6476e800b70b5ae5565f8'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'target_display'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '148fcae7d82a4f6498a9417c5a397614'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_quality_approver'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1cb8c5b61fc64726a403ca93c07fe126'
                        key: {
                            name: 'cmdb_ci_business_app'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1da68f241a0d4454b92c665a52213398'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1de6982a7e2c40a5893b8ccd9f1f8200'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'audit_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '1f8abf443ad942b680d2745a7a67be59'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'quality_approver_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '2076ba6d1ea14aa3b521a4e71971f707'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'run_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '24fd6371135e4ca2aa291ea5c21f1472'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'granted_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '26b242f1bed44a84aba5122331f27cf7'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'inputs_redacted'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29fa599dc0bc483aa43c5e116d1c4fec'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '2a1a9810992c40e18c8e111154f3edf7'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'incident_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c3fab9adee44ae4b6fb010f4fb973ea'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'system_owner_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3167e5a100fb481fbf89f8d5582d7cf0'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'mfa_verified'
                            value: 'not_required'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '334249a9d0914ce18e69d031d3324d3c'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'target_display'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '334381ab02844707881c53d40048bafe'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '3435acb1496940d9b6109b43d0b5ea7d'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'inputs_redacted'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3443c07163994733a7607ce2b69e9002'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34c151fe7cd243f79cc3a503f42a6f57'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35812d2cbfe54499ac210c0081634f03'
                        key: {
                            name: 'var__m_sys_hub_flow_input_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'run_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3847a36cc5114642b3134b6eb6bac133'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3934c426fcd34cd286d7a4ef0f70abce'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'system_owner_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '39a0dbe921604224b0c23b8164e615e6'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '39d772f0a4d84907be892f50345441a3'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'run_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '3aa5e607b8ab45b5877c8d468dde3387'
                        key: {
                            logical_table_name: 'x_snc_helix_core_ai_action'
                            col_name_string: 'run_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b5f14322dc446b192afae7b9f299970'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3ccefdab98524cc185973780c76da248'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'inputs_redacted'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '4032b810877a416a917966357535848e'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '406ec65ace9f4f4b8a99abcb54e78a07'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'run_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '44ced8056ed847fb9eee161bc3ffb106'
                        key: {
                            category: 'x_snc_helix_core_ai_action'
                            prefix: 'AIA'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '454cd1b67f9e484da4b5db0d67a2feb5'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '46da01f659514ab092a4923a2b7fd87c'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'audit_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '47e5d109ee1f4c2a98139d5d47ba9193'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'audit_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4887faac42b948c88792574c8155217f'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            value: 'notify_requester'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4aab6fd3030a401fa0dfaf5477124516'
                        key: {
                            name: 'var__m_sys_hub_flow_input_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'run_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4b9353e3b58b4f2abf880d0d25e863a2'
                        key: {
                            sys_security_acl: 'c6441e911f0c4778b399c9f8bdaa4bb6'
                            sys_user_role: {
                                id: 'e5043a622ca949e59285a4e83ae6fd19'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '4d566886d0a74df990d9fc43b33b5ad7'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e68dca2a85742bd897c9626d78ff9c6'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4e76c456108c43f19635c947f1a294f3'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_type'
                            value: 'eval'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f731b2fa9194e498e74c97aeea85e2d'
                        key: {
                            name: 'var__m_sys_hub_flow_output_2073b2a7ed754529901d2cf94497ea12'
                            element: 'audit_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f974e5d99244bf48b5e391284a1bb02'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'mfa_verified'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53088e8544284f4a83d87679f413a1a0'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '5353008e62474d338dcc90744c7110b2'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5608cc2440c64b2184bd7f48037fc999'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'application_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '574dd77725b3421eb57b606db6b0a86a'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'mfa_verified'
                            value: 'approved_simulated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '575c34b4d12349c1bcb6858d1760577b'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'justification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b7f574112654f21b36660f42c5a00e8'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                            value: 'executed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ba303bee6984b298c893d0b43728214'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'run_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5dc264e900dc4a9e8096c2f30a01b9bf'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'request_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '5e503a09f4974180b525a5fd21690032'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'audit_number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '5f481518407d4f90be013006e5ca5505'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5f4bf89d65064b848595ca87a806935a'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5fb2b2cf384344809c5897eea7bf63f1'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'result'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6094e6be6b9a4767a82223b277ae2a6a'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61ec815c2f87424391570eb3e979fcf3'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '61ee39d1b4a4475fbf1d8b44505748ee'
                        key: {
                            sc_cat_item: '63b8a13ce4cf4800bdf24c3bebe68e30'
                            sc_catalog: 'e0d08b13c3330100c8b837659bba8fb4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6738354da5e84b61a5fba8c06dbb759a'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_gxp_classification'
                            value: 'not_validated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '686602f984e348f693c435889d22384c'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'incident_number'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '69f60021b5784de0844994d0d36af28c'
                        key: {
                            name: 'x_snc_helix_core.agent_api'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c72e2a9857e40a595a69f519f194958'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'quality_approver_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '6e56b82d5e90411fb7cfc19af07165b1'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '6ed14a14db754d91a4c5b416854ad9f2'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'audit_number'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '6f54d58f6efd4497bdd6597226883a52'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6fd300728379441ab492d8856f5c0026'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '704813ba35c1487882b636ba19c21441'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'found'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '717a92b43b2841e286c36ecafb5f8140'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'granted_on'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72893dab936c4026b503a0c940333290'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '73fbd7cbf02d4999a7257bd998f07695'
                        key: {
                            name: 'var__m_sys_hub_flow_output_202546fdabae4e4580ebd2eee92f068e'
                            element: 'gxp_classification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '74c24582d7e249d5be70a8323db08f87'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'mfa_verified'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77aa4e0b2ede41a48760f870c94f6ff3'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            value: 'create_access_request'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '781f854aab5445f59adec9e933ec9dac'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '78f17cc02c57445cae2f578181359b81'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'application_sys_id'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '7b034c5b3a3e4e3e815bef5a6e663be0'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'request_sys_id'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7b64b67891484610ab8cf6ffcf54d7ab'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b9f5c6e257241128003a6aeb9e7cfc3'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bc85eaa6e6a4341913091b8d0bdf4af'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'target_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7cb7b666e94d4e878935b1e1ad18e914'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'inputs'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7d18ef4e2a49410988081b1ff7c800e4'
                        key: {
                            name: 'var__m_sys_hub_flow_input_202546fdabae4e4580ebd2eee92f068e'
                            element: 'run_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '7df813f37adc4da9bc748a9a18310077'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'confirmed_by'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '7eafe3d3a4714ee9b085da99ec5ae163'
                        key: {
                            sc_cat_item: '60c5892ba8bd4ef3a8e8a10fe30c472a'
                            sc_category: '2809952237b1300054b6a3549dbe5dd4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7ee62aa78fbb42ca8c82a3ec40d9201f'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'incident_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '7efd02fb3c304a9f9958e8a617e8f946'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'manager_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '81b78c3d4df6409197c2035572015396'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '835b04197bda4d1e9c63ad0730d1bebf'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_system_owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '83d576e91b7b45b3b643c197b39ecdb0'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'system_owner_name'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '84d35564a1154fbcb4cb868a7e988c9e'
                        key: {
                            sc_cat_item: '60c5892ba8bd4ef3a8e8a10fe30c472a'
                            sc_catalog: 'e0d08b13c3330100c8b837659bba8fb4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8617ff90874f40c18e694b48797967f6'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                            value: 'read'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '86fabe955cef4cf6bf8f8b72396ca044'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '87dd4394370b4a148fec7771d27f5073'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '8cbcd04fc4d3459cbebda750b4c00ca4'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d1bc1df3d674aa695e744797f9d1673'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8e28cf0c2a3744e882ff11f6af4c5ce5'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '946b0937918541d7bc404ee23619378e'
                        key: {
                            name: 'var__m_sys_hub_flow_input_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '94d6b29ee9aa490a96a24eae17ab806e'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'request_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '957ceec0fa5447ab9c9d78bf40cb6fa0'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                            value: 'not_required'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '972109e3c6e741b098ecbcd020d94c3c'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'autonomy_tier'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '98ecab6a393349ebb16122cff2e893ad'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '994282962fcd490b9c392d746769e95f'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'quality_approver_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9af0c3ee8f67465488de42cd789cdfe1'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '9bac85470a8346c5847516a2d87e4e3c'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'mfa_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9c34b85c8f954c819259bb802529616d'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            value: 'check_entitlements'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '9dbdc01198774dc9bb902ef5522ff37e'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'run_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f08702d43b04364b5a358528295240a'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a1bdae2c86614043acce405559b77878'
                        key: {
                            name: 'var__m_sys_hub_flow_input_2073b2a7ed754529901d2cf94497ea12'
                            element: 'run_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'a4d4cc09a0e84010bb3d052672ae1d2d'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a509578e616f417da805efbe61900a29'
                        key: {
                            name: 'var__m_sys_hub_flow_input_2073b2a7ed754529901d2cf94497ea12'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a64c48b213f3447da0e4284ea4716a83'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'mfa_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a805fecab2cf44e080531b7a4544ec7f'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9eca24157914154a8a26e3d55b58d32'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa64a90c2d434b99a7202a4195bcdb4e'
                        key: {
                            name: 'var__m_sys_hub_flow_input_2073b2a7ed754529901d2cf94497ea12'
                            element: 'run_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab3ac06ab7cd44018ae387d478a6938f'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'mfa_verified'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'acc079a84b3640ba8b2105c53d3238d4'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'acf2dcd28d144113ac2b79946e2c6495'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ad36388b48fb462494dc63b72fcd220a'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                            value: 'tier_1'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad6e627127074e4db0dfd86a83f76dde'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'target_table'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b012fc36fe6b44cab290c79f41a13626'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'b031328d91034d6995a1f9416b3cbe0c'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'run_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b088284fcd7349738ddd08218f5b3464'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'confirmed_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'b2343f50bd7145089e4de599179065bc'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'audit_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b3c93b4a2693410dacdfd99c8d53c623'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'audit_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b41dbd671da7416481a9fae29e36cc30'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                            value: 'routed_for_approval'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba21d66b58a34213b4c3bd19ff28f26c'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'manager_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba7f35e11289448c99fd985deeddaa23'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'granted_on'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'bbd1fe7646134d51b52f206fffd031ee'
                        key: {
                            name: 'cmdb_ci_business_app'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bbf76e9373b64c7fb318f82efa26aeb7'
                        key: {
                            sys_security_acl: '1c87f310dd954a7f981cc18c0b0f22e3'
                            sys_user_role: {
                                id: 'e5043a622ca949e59285a4e83ae6fd19'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'bf43cf3504ad4adca9f8004cbc97dbba'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'gxp_classification'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'bf5f21b307e14539b20b3779e3ec5363'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'run_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c085e426da0e4452a8f99c598f24c44c'
                        key: {
                            name: 'var__m_sys_hub_flow_input_2073b2a7ed754529901d2cf94497ea12'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c0cd8a2a62db484f89cb0e23a47afb90'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c1541a94a61a48b8b2b1e40fc280e675'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                            value: 'eval_harness'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c176e726fc0c46abb716d7fa88ead17b'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                            value: 'tier_3'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c21fe8367a8f40439bbba6ec41a21b1f'
                        key: {
                            sys_security_acl: '150425eaeba34407b0ee5a100ed741ae'
                            sys_user_role: {
                                id: '69f60021b5784de0844994d0d36af28c'
                                key: {
                                    name: 'x_snc_helix_core.agent_api'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c2ac565f078a4a5cafdb83c7d4cf09b3'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                            value: 'human_presenter'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6c5a35bac624b75b1960fe759abeab3'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'inputs_redacted'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c86d5fc0a71546c88e7a0003339deddc'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c98c203b327d4d9bb029d934c549b039'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            value: 'check_application'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'cd10a2e60cfe46b1af58b7ef9f190b5f'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd9463c027cf470cb44b57304632ab55'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_system_owner'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'ce3bae135ce741428005ca7eb5990970'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'record_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ced4cd7d3c5142c9a20e08fd9b3f330b'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f5934dada8684d80990f1f7cae0a3734'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd0ba64f612354312b818ad195ae85278'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'd0cc67dc94e5462586066a2fa2dc5455'
                        key: {
                            model: '2073b2a7ed754529901d2cf94497ea12'
                            element: 'has_access'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'd2f87d6513dd49e1a1cb19ca23d68fb0'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd32c732ff9864f0e9bdaefee52b20d44'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_gxp_classification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3973d83690d49418430e76cf0c46213'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'audit_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd40f4c6435c54f3da7f49504c630583a'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            value: 'unlock_account'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd44367354000499a8d6471c5440ed6a2'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'request_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4b457bbf2e54de480f42bf6a195dac0'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'd7f78999cc8a4d1eb61f5a1871d79839'
                        key: {
                            model: '0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db7d8d5a2fa643179b2436b95aba9a8d'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'result'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dc1c0ba36a4b474ea3320373fc198453'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'tool_name'
                            value: 'lookup_user'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de156578b922454ba3d507b588eed14b'
                        key: {
                            name: 'var__m_sys_hub_flow_input_202546fdabae4e4580ebd2eee92f068e'
                            element: 'run_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'e062f7e5009e45d4bf2dbdec31bcc915'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'e14322c1a223488e8e03c95823a2d514'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'system_owner_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1e76cc5dc70436c94d057e84af81b98'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                            value: 'read'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e263838b4ca7455ebc41cea2fc251fee'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'incident_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e47fa4b6e131406c89eb84ccca538a1f'
                        key: {
                            name: 'var__m_sys_hub_flow_input_202546fdabae4e4580ebd2eee92f068e'
                            element: 'application_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5dd5a42c6114ec28a48465cbe4b1244'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'e8d5ddd3045c43528b212a6dfdd4e1aa'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'application_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e93ffa29bc624c2b88211f8c2e75091c'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                            value: 'studio_supervised'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e9ca267ecc8445be803aa2d86e800260'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea05a0a6350a4daa90a9bc8a8b1d84ce'
                        key: {
                            name: 'var__m_sys_hub_flow_output_2073b2a7ed754529901d2cf94497ea12'
                            element: 'has_access'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eb82cc6ae95b45ad88697ab2badcae9a'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_gxp_classification'
                            value: 'validated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec3d580ee1be4a509d9be513ffde5e8d'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'confirmed_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'ecfaf89a33f046bb8edede4c3294b736'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'run_type'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'ed0e855fb28c46598d41cd5bdeefb87a'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'run_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ed20e9cb00fe47fe9cc901887899f82b'
                        key: {
                            name: 'var__m_sys_hub_flow_input_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'record_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f177e9bd2f84447a8ad1f8ab957ce2c4'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                            value: 'tier_2'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'f1b3ff07c88549a38de041764ad87f22'
                        key: {
                            model: '202546fdabae4e4580ebd2eee92f068e'
                            element: 'quality_approver_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f210e19e63b14cb3bc48b2b6c489bb44'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f5934dada8684d80990f1f7cae0a3734'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f25beea1034d4ed1ae6bb619ce2025f1'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f29e6bcae4cb42eeae39a95a33fec468'
                        key: {
                            name: 'cmdb_ci_business_app'
                            element: 'x_snc_helix_core_quality_approver'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f481879035114f99873be6352ebd8eae'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'autonomy_tier'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f4899e6ddbf540c8824f702c312b9ad1'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0dab321e35bd488b9168b23b7bae9d9a'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f496103fb574441c8a16c4aedd4bbf86'
                        key: {
                            name: 'var__m_sys_hub_flow_input_a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'f4a2de14abd0498fbbcaae646fa83030'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'autonomy_tier'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f78a254ef47840dea01fd7cdc7ea2a2c'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'inputs'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'f9d45a5daa0646c8838eb13649f6bd38'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f9dfbaeabec4470dbc37d0c27cea8522'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'run_type'
                            value: 'demo'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fb77467cfb5b4bb59f0a93069577f607'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'decision'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fbd4ea7087e7496ba92d955001b50335'
                        key: {
                            name: 'x_snc_helix_core_ai_action'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'fcc46fda75d7431c994b40a1c0221abe'
                        key: {
                            model: 'a8d4c0d51b1e4bbc9d2cb0df380898b9'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'fd63f612f2e14da99f0317b281700690'
                        key: {
                            model: 'f5934dada8684d80990f1f7cae0a3734'
                            element: 'justification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ffa4a9312a3c4df698507c7f26933afc'
                        key: {
                            name: 'x_snc_helix_core_entitlement'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
