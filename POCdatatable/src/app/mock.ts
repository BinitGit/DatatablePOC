import { FilterType, Filter } from './datatable-types';

export const rows = [{ name: 'Austin', gender: 'Male', company: 'Swimlane' },
                     { name: 'Dany', gender: 'Male', company: 'KFC' },
                     { name: 'Molly', gender: 'Female', company: 'Burger King' }];

export const columns = [{ prop: 'gender'},
                        { prop: 'name'},
                        { prop: 'company'}];

export const filters: Filter[] = [{ prop: 'name', type: FilterType.text,
                                    params: [{ key: 'textInput',
                                               value: null }]},
                                  { prop: 'gender', type: FilterType.dropdown,
                                    title: 'Pick a gender',
                                    params: [{ key: 'Male',
                                               value: 'Male' },
                                             { key: 'Female',
                                               value: 'Female'}]}];
