export interface Status {
    name: string;
    amount: number;
}

export interface Application {
    id:number;
    jobPosition:string;
    company:string;
    salaryRange:string;
    location:string;
    status:string;
    documents:string[];
    notes:string;
}


export const fakeApplications:Application[] = [
    {
        id:1,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:2,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:3,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:4,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:5,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:6,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:7,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:8,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:9,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
];

export const fakeStatuses: Status[] = [
    {
        name:'Applying',
        amount:10,
    },
    {
        name:'Applied',
        amount:7,
    },
    {
        name:'Interviewing',
        amount:5,
    },
    {
        name:'Offered',
        amount:8,
    },
    {
        name:'Rejected',
        amount:8,
    }
];

