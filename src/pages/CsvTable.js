import React, { useState, useEffect, } from 'react'
import { collection, getDocs, } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { Button, Col, Row, Table, } from 'antd'
import { CSVLink } from 'react-csv';
import dayjs from 'dayjs';


export default function CsvTable() {

    const [getData, setGetData] = useState([])
    const [formData, setFormData] = useState([])

    const fetchDocuments = async () => {

        let array = []
        const querySnapshot = await getDocs(collection(firestore, "admissionForms"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            let datecreated = doc.data().dateCreated;
            let date = new Date(datecreated.seconds * 1000 + datecreated.nanoseconds / 1000000);
            data.date = date.toLocaleString()
            array.push(data)

            // console.log(date)
        });

        setGetData(array)

        console.log(array)

    }
    useEffect(() => {
        fetchDocuments();
    }, [])


    useEffect(() => {

        let sortData = getData.sort((a, b) => {
            return a.registrationNumber - b.registrationNumber;
        })
        setFormData(sortData)

    }, [getData])


    const columns = [
        {
            title: 'Photo',
            render: (text, item) => (
                <img src={item.photo?.url} alt='profile-img' style={{ height: '70px', width: '70px', borderRadius: '50%' }} />
            )
        },

        {
            title: 'Full Name',
            dataIndex: 'fullName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Father Name',
            dataIndex: 'fatherName',
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dob',
        },
        {
            title: 'Gender',
            render: (text, item) => (
                <>{item.gender?.value}</>
            )
        },
        {
            title: 'Profession',
            render: (text, item) => (
                <>{item.profession?.value}</>
            )
        },
        {
            title: 'Profession Place',
            dataIndex: 'educationRelegiousInstitute',
        },

        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'Whatsapp Number',
            dataIndex: 'whatsapp',
        },

        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Date Created',
            dataIndex: 'date',
        },
        {
            title: 'Education Religious',
            render: (text, item) => (
                <>{item.educationReligious?.value}</>
            )
        },
        {
            title: 'Education',
            render: (text, item) => (
                <>{item.educationModern?.value}</>
            )
        },
        {
            title: 'Expertise',
            dataIndex: 'addtionalExpertise',
        },

        {
            title: 'Country',
            render: (text, item) => (
                <>{item.country?.name}</>
            )
        },
        {
            title: 'Region',
            render: (text, item) => (
                <>{item.region?.name}</>
            )
        },
        {
            title: 'City',
            render: (text, item) => (
                <>{item.city?.name}</>
            )
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Skill',
            render: (text, item) => (
                <>{item.skill?.value}</>
            )
        },
        {
            title: 'Fee Submitted',
            dataIndex: 'isFeeSubmitted',
        },
        {
            title: 'Registration Number',
            dataIndex: 'registrationNumber',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    const headers = [
        { label: "First Name", key: "fullName" },
        { label: "Father Name", key: "fatherName" },
        { label: "Date Of Birth", key: "dob" },
        { label: "Gender", key: "gender.value" },
        { label: "Profession", key: "profession.value" },
        { label: "Profession Place", key: "educationRelegiousInstitute" },
        { label: "Phone Number", key: "phone" },
        { label: "Whatsapp Number", key: "whatsapp" },
        { label: "Email", key: "email" },
        { label: "Education Religious", key: "educationReligious.value" },
        { label: "Education", key: "educationModern.value" },
        { label: "Expertise", key: "addtionalExpertise" },
        { label: "Country", key: "country.name" },
        { label: "Region", key: "region.name" },
        { label: "City", key: "city.name" },
        { label: "Address", key: "address" },
        { label: "Skill", key: "skill.value" },
        { label: "Fee Submitted", key: "isFeeSubmitted" },
        { label: "Registration Number", key: "registrationNumber" },
        { label: 'Date Created', key: "date" },
        { label: "Status", key: "status" },
        { label: "Photo", key: "photo.url" },
    ]

    return (

        <div className="container py-5">
            <Row className='mb-3'>
                <Col span={24} className='text-end'>
                    <CSVLink type='primary' data={formData} headers={headers} filename={`Addmission Form Till ${dayjs().format('DD/MM/YYYY/hh/mm/ss/A')}`}>
                        <Button type='primary'>DownLoad Now</Button>
                    </CSVLink>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table bordered columns={columns} dataSource={formData} scroll={{ x: true }} />
                </Col>
            </Row>
        </div>
    )
}
