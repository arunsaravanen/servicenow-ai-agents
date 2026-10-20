import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'ce1bb377f84f4c98ae588097d8104718'
                    }
                    'helix-access-agent': {
                        table: 'sn_aia_agent'
                        id: '3719448679ce413e9638f19c72d8ee16'
                    }
                    'helix-access-agent-acl': {
                        table: 'sys_security_acl'
                        id: 'a77abcb2609648398cea8cc97f52f4c6'
                    }
                    'helix-access-workflow': {
                        table: 'sn_aia_usecase'
                        id: '3e15c8bba1034d95a90b536080aeef56'
                    }
                    'helix-access-workflow-acl': {
                        table: 'sys_security_acl'
                        id: '995fc79ca4774fa995da1d6c88a3b19c'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '1976bc737d55462abcb981e8ab9635a3'
                    }
                    'sarah-role-access-requester': {
                        table: 'sys_user_has_role'
                        id: '806976eae3324f368234b0c1f63d4c66'
                    }
                    'sarah-role-now-assist-panel': {
                        table: 'sys_user_has_role'
                        id: 'fad79dca7f66482285f12c4114ce1d42'
                    }
                    'studio-car-app': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: 'a034eb3fcb5349cd8e56218b3e5fcb7d'
                    }
                    'studio-car-core': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: 'f819c4e20d0b493197d5c998846b737f'
                    }
                    'studio-car-else': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd31029444a5447a2ad9e82bf6db5f12b'
                    }
                    'studio-car-if-found': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b234c98b0dfb4625874b98a46eeb2fb0'
                    }
                    'studio-car-me': {
                        table: 'sys_hub_action_instance_v2'
                        id: '62d0c2b1402f4695820f8de0b5464000'
                    }
                    'studio-car-out': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '4dc0af5f90964d02b2bf5575a28ae27d'
                    }
                    'studio-car-out-missing': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a6b92140f53a48a79abf52bb7ae14140'
                    }
                    'studio-check-application': {
                        table: 'sys_hub_flow'
                        id: 'a8027d02667f48d2a3eb2a0aee954ec9'
                    }
                    'studio-check-application-core': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: '37a1331a3711430ba59f40d51f9db601'
                    }
                    'studio-check-application-out': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '872240a05dc746199ad97a4ef52dee3c'
                    }
                    'studio-check-ent-app': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: '5c30dbef136349869203af27bbd0917f'
                    }
                    'studio-check-ent-core': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: '1c9900628aa34a489fe278c98bedcbb4'
                    }
                    'studio-check-ent-else': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '0b65a0da9b074f0a82e718ddc352f906'
                    }
                    'studio-check-ent-if-found': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '47ee86165faf4e3989b8ad53aa0f360c'
                    }
                    'studio-check-ent-me': {
                        table: 'sys_hub_action_instance_v2'
                        id: '226cd6cd756b44f4baa185679fca5fe3'
                    }
                    'studio-check-ent-out': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '8475b8592ab84efcbb2e37444d7263e2'
                    }
                    'studio-check-ent-out-missing': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '651a773fae59494da2070bfdfd84d1bd'
                    }
                    'studio-check-entitlements': {
                        table: 'sys_hub_flow'
                        id: '22318850f4dd4d8cb6c003904d8bc427'
                    }
                    'studio-create-access-request': {
                        table: 'sys_hub_flow'
                        id: 'd575ef8beca4468e9bd2f786d4b78ef1'
                    }
                    'studio-lookup-user': {
                        table: 'sys_hub_flow'
                        id: 'c4f465d8ed4b4acb9535d7d199acc476'
                    }
                    'studio-lookup-user-me': {
                        table: 'sys_hub_action_instance_v2'
                        id: '959b546601ac482fbb1b1873e1df11c4'
                    }
                    'studio-lookup-user-out': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b98802df5b00492c9f47d8d42c76fd27'
                    }
                    'studio-notify-core': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: 'eb792d644598420ab7e53548fddcfdbf'
                    }
                    'studio-notify-me': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ada2bbd25aea48cb8c2c462c5544003b'
                    }
                    'studio-notify-out': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'e1acea8cc82d49a08277c96c5b04d5a5'
                    }
                    'studio-notify-requester': {
                        table: 'sys_hub_flow'
                        id: '0b955ddaad8b451ba48a336588cabb63'
                    }
                    'studio-notify-ticket': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c841fbece26843f192ded04e7f25e874'
                    }
                }
                composite: [
                    {
                        table: 'sn_aia_tool'
                        id: '0038a920dacf4743bf8ad3029b424339'
                        key: {
                            name: 'check_entitlements'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '028c929ac3234feeb226fc8cc984d6cb'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'justification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0646e81c8aee48b3972f841a683408d8'
                        key: {
                            name: 'var__m_sys_hub_flow_output_22318850f4dd4d8cb6c003904d8bc427'
                            element: 'found'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b29770c391245c8a1cdd9aaa68b0ac0'
                        key: {
                            name: 'var__m_sys_hub_flow_input_22318850f4dd4d8cb6c003904d8bc427'
                            element: 'application_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '125e707421314645a1616090be93d77f'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'system_owner'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '1403eee440264e04a81e3d9e653ea252'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                            tool: '61589c68789c4dfabc339a193f3c80c6'
                            name: 'notify_requester'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c2ddfe499764f7fb6dc52e43b6c519f'
                        key: {
                            name: 'var__m_sys_hub_flow_output_22318850f4dd4d8cb6c003904d8bc427'
                            element: 'granted_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '232e955b37834ca7bebbe94983eea299'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'autonomy_tier'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '250a60364a2a4d01b6c023d19f9f9d7c'
                        key: {
                            model: '0b955ddaad8b451ba48a336588cabb63'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '2c643679fe0c46229fb1cca9bc78c9c3'
                        key: {
                            model: 'c4f465d8ed4b4acb9535d7d199acc476'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '30287f850ed74618b7b94e3dbd73cfd9'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'application_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b753e6290ff450ba3f69331c270bbfd'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0b955ddaad8b451ba48a336588cabb63'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '3ca5112cf2174001aef4e5794c533d71'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '40b2306967414c19a042cdd7ee69f9e7'
                        key: {
                            model: '0b955ddaad8b451ba48a336588cabb63'
                            element: 'record_number'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '44814721f6f042a3a3194cb626cf7ef3'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'request_number'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '44f246c517754e83bfb9ab4732d291c8'
                        deleted: true
                        key: {
                            sys_security_acl: 'a77abcb2609648398cea8cc97f52f4c6'
                            sys_user_role: '99d7426c4eee4f78ad74f6f349e9735b'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4568d6c0cab34cbb885b9174091a1d0e'
                        key: {
                            name: 'var__m_sys_hub_flow_output_22318850f4dd4d8cb6c003904d8bc427'
                            element: 'has_access'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '4c25b12b2ccf465ab49313d6c8922f29'
                        key: {
                            name: 'lookup_user'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '51d341345a4a415c8ea69a860a178b26'
                        key: {
                            model: '0b955ddaad8b451ba48a336588cabb63'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '58755e0020af4b898b018168fc3e868f'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                            tool: '5b8a79d224aa4706a0b9b4c9cb36fdb9'
                            name: 'create_access_request'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '5b8a79d224aa4706a0b9b4c9cb36fdb9'
                        key: {
                            name: 'create_access_request'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '5c99d3b575d3466cba6c39e3436d8c0b'
                        key: {
                            model: 'a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'application_name'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '61589c68789c4dfabc339a193f3c80c6'
                        key: {
                            name: 'notify_requester'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '693bf45cf9864e7eafb884953a0d6b0d'
                        key: {
                            name: 'var__m_sys_hub_flow_output_c4f465d8ed4b4acb9535d7d199acc476'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_team'
                        id: '6e0bc50a5c2e42b4898fce51120c1666'
                        key: {
                            name: 'Helix Application Access Team'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6f6b1e2e70124294bfe31f5684745f6e'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0b955ddaad8b451ba48a336588cabb63'
                            element: 'record_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '709727791d68422192f63bb4a724f730'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'quality_approver'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '729af5e7e36343b8aaeca09dbdecfcba'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '748933b77c1f41799cdbcda2b4abdf6b'
                        key: {
                            model: 'a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'gxp_classification'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '7504d5af4790425fb2bdf1c0ebcf9f1a'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'autonomy_tier'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '7555637c6aea41c58db97bf8f952d2ba'
                        key: {
                            model: 'a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77d43acceb004f1894791d5b5d158bf5'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'quality_approver'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_team_member'
                        id: '78ea868029854f3b86919b596551c59e'
                        deleted: true
                        key: {
                            agent: '0398480fc8894191ae8884261dc6623f'
                            team: {
                                id: '6e0bc50a5c2e42b4898fce51120c1666'
                                key: {
                                    name: 'Helix Application Access Team'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '7ddddaffcca846418c8c52ae91d7381f'
                        key: {
                            name: 'check_application'
                        }
                    },
                    {
                        table: 'sn_aia_version'
                        id: '82415ba1bdc0498bb3de3dff06742d50'
                        key: {
                            target_id: '3719448679ce413e9638f19c72d8ee16'
                            version_name: 'V1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '850cbebda7184a72bc8a26b8a62c9164'
                        key: {
                            name: 'var__m_sys_hub_flow_output_c4f465d8ed4b4acb9535d7d199acc476'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: '86844b6b15d14a7781658167c576b72a'
                        key: {
                            agent_access_config: {
                                id: 'f22a9352427046b090af2cee5c1fa164'
                                key: {
                                    agent: '3e15c8bba1034d95a90b536080aeef56'
                                }
                            }
                            role: {
                                id: '4e922f52883c4e5bb6cda971d514e3e8'
                                key: {
                                    name: 'x_snc_helix_agent.access_requester'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '9133704ed0f14a6b9752729b70f212c9'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95f4310f4ec648a593ebff73555d520c'
                        key: {
                            name: 'var__m_sys_hub_flow_input_a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'application_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '975032812efc47e5921b0647b2a56609'
                        deleted: true
                        key: {
                            sys_security_acl: '995fc79ca4774fa995da1d6c88a3b19c'
                            sys_user_role: '99d7426c4eee4f78ad74f6f349e9735b'
                        }
                    },
                    {
                        table: 'sn_aia_version'
                        id: '9880a44869ce48f9aeaff048bcec8aaf'
                        key: {
                            target_id: '3e15c8bba1034d95a90b536080aeef56'
                            version_name: 'V1'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '98fe8a55f5844014880c47bfb6f99f64'
                        key: {
                            sys_security_acl: 'a77abcb2609648398cea8cc97f52f4c6'
                            sys_user_role: 'cb0393c1f2cd41c6999a9c2926a45397'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3ddc96bbc48447e901e697ab56f3928'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'system_owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'a4792524ba37425986c499ad3c62e5db'
                        key: {
                            model: 'd575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'quality_approver'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a6bd298c17234db8bb932348f3a6056a'
                        key: {
                            name: 'var__m_sys_hub_flow_input_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'justification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'adde6112abfe4cd99cad7351cbe50b33'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'gxp_classification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: 'af88ada978fe4c45926aa61d164cd23e'
                        key: {
                            agent_access_config: {
                                id: 'b1eead230a5d427382dde1ec69ca5313'
                                key: {
                                    agent: '3719448679ce413e9638f19c72d8ee16'
                                }
                            }
                            role: {
                                id: '7de6a5581b774b50befc10e19096582b'
                                key: {
                                    name: 'x_snc_helix_agent.access_requester'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: 'b1eead230a5d427382dde1ec69ca5313'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7f98bea91cd439d9da41a2c7bf1ed34'
                        key: {
                            name: 'var__m_sys_hub_flow_output_0b955ddaad8b451ba48a336588cabb63'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_agent_config'
                        id: 'b9c41c46fe434cfbb5c00a2564384912'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba423b0f309a4e658f49ea90ca20e1b1'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'bd2f7db8ffc049e9a0d16c55c1dcd90f'
                        key: {
                            model: 'c4f465d8ed4b4acb9535d7d199acc476'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'beb47ffeaf6b44feb04cbd6a5f96506e'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'system_owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'c4af468971ee4dabb7d3e8b673d193dc'
                        key: {
                            model: '22318850f4dd4d8cb6c003904d8bc427'
                            element: 'has_access'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c626761088ed4a0bb458703dfe2078da'
                        key: {
                            name: 'var__m_sys_hub_flow_input_0b955ddaad8b451ba48a336588cabb63'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'cb0393c1f2cd41c6999a9c2926a45397'
                        key: {
                            name: 'x_snc_helix_agent.access_requester'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'cc0c674c698a4d108184d367af007152'
                        key: {
                            model: '22318850f4dd4d8cb6c003904d8bc427'
                            element: 'granted_on'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf2f140b015c4f3d8f690faa2975e9ef'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'success'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'd110e77deff24c198487c1d706c43f1e'
                        key: {
                            model: '0b955ddaad8b451ba48a336588cabb63'
                            element: 'success'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd59963d9cdd64860b67fa3e7d4cdf9a2'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'request_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6433540489d4833b6feb0ba19ef83fa'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'd74728b4d6f04d469adae58bb7b03c90'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                            tool: '4c25b12b2ccf465ab49313d6c8922f29'
                            name: 'lookup_user'
                        }
                    },
                    {
                        table: 'sn_aia_team_member'
                        id: 'd8028fdc18a742518524d99196317fdc'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                            team: {
                                id: '6e0bc50a5c2e42b4898fce51120c1666'
                                key: {
                                    name: 'Helix Application Access Team'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da85718a3622401dbc2d0279b352ae43'
                        key: {
                            name: 'var__m_sys_hub_flow_output_a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'found'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'dfb19544a40646dea723fa1392c330a1'
                        key: {
                            model: 'a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'found'
                        }
                    },
                    {
                        table: 'sn_aia_usecase_config_override'
                        id: 'e0ff99b903714d87aa246ae029333d18'
                        key: {
                            usecase_configuration: '3e15c8bba1034d95a90b536080aeef56'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'e879f5e81f034c2891a55ee027c34436'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                            tool: '0038a920dacf4743bf8ad3029b424339'
                            name: 'check_entitlements'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'e919e9b9fef644ae912ecef8212cb192'
                        key: {
                            model: 'c4f465d8ed4b4acb9535d7d199acc476'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'ef410f45f2f24eb4b49a451c8cb84178'
                        key: {
                            model: '22318850f4dd4d8cb6c003904d8bc427'
                            element: 'found'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'efdf554e3a4c488fb092a3f53a663249'
                        key: {
                            model: '22318850f4dd4d8cb6c003904d8bc427'
                            element: 'application_name'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: 'f22a9352427046b090af2cee5c1fa164'
                        key: {
                            agent: '3e15c8bba1034d95a90b536080aeef56'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f287ac749e694ff1af8960ffa6f8ddf2'
                        key: {
                            name: 'var__m_sys_hub_flow_output_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'f450301b24894e85aee2df34955e134b'
                        key: {
                            model: 'a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'quality_approver'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f45fca7e43574554864d1ab404addd57'
                        key: {
                            name: 'var__m_sys_hub_flow_input_d575ef8beca4468e9bd2f786d4b78ef1'
                            element: 'application_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'f86dcf575cb84ea0a5b70293d55de167'
                        key: {
                            model: 'a8027d02667f48d2a3eb2a0aee954ec9'
                            element: 'system_owner'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fa85444681a346489b54762c4849adec'
                        key: {
                            sys_security_acl: '995fc79ca4774fa995da1d6c88a3b19c'
                            sys_user_role: 'cb0393c1f2cd41c6999a9c2926a45397'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fee170d3fcf54db78bae3e97691338ef'
                        key: {
                            name: 'var__m_sys_hub_flow_output_c4f465d8ed4b4acb9535d7d199acc476'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'ff86467fb08748eab9162b1e122f5262'
                        key: {
                            agent: '3719448679ce413e9638f19c72d8ee16'
                            tool: '7ddddaffcca846418c8c52ae91d7381f'
                            name: 'check_application'
                        }
                    },
                ]
            }
        }
    }
}
