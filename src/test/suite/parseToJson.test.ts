import * as assert from 'assert';
import { parseToJson } from '../../parseToJson';

suite('parseToJson Test Suite', () => {
    test('parseToJson should return JSON from string', () => {
        const input = `TransactionModification{transactionId=fictitious-event-id, version=1.0, happenedOn=2023-11-18T20:28:04.293240Z, metadata=EventMetadata{context=DomainContext{traceId=fake-trace-id, processName=CustomerTransaction, ipAddress=123.456.789.012, userAgent=Fictitious UserAgent v1.0, isMobileDevice=false, toggles=[], inquiryId=fake-request-id, country=FAKE_COUNTRY, platformTimeZoneId=Fake/TimeZone}, topic=prod-customer-financials-status, key=fictitious-key}, history=[com.example.event1, com.example.event2, com.example.event3], customer=Client{id=fake-client-id, transactions=[ClientPayment{id=fictitious-payment-id-1, time=2021-01-01T00:00:00Z, medium=Fictional_Channel_1, value=99999.000000, loanDistribution=[LoanPaymentDistribution{loan=Loan{recordId=fictitious-loan-id-1, ownership=FICTIONAL_OWNER_1}, totalValue=99999.0, currentWarranty=0.0, currentInterest=0.0, currentCapital=99999.0, warrantyOverdue=0.0, interestOverdue=0.0, lateFees=0.0, moratoryInterest=0.0, prepaymentBenefit=0.0, overdueCapital=0.0, unpaidWarranty=0.0, unpaidCapital=0.0}]}, ClientPayment{id=fictitious-payment-id-2, time=2021-02-02T00:00:00Z, medium=Fictional_Channel_2, value=88888.000000, loanDistribution=[LoanPaymentDistribution{loan=Loan{recordId=fictitious-loan-id-2, ownership=FICTIONAL_OWNER_2}, totalValue=88888.0, currentWarranty=0.0, currentInterest=0.0, currentCapital=88888.0, warrantyOverdue=0.0, interestOverdue=0.0, lateFees=0.0, moratoryInterest=0.0, prepaymentBenefit=0.0, overdueCapital=0.0, unpaidWarranty=0.0, unpaidCapital=0.0}]}, ClientPayment{id=fictitious-payment-id-3, time=2023-11-18T20:28:03Z, medium=Fictional_Channel_3, value=77777.000000, loanDistribution=[LoanPaymentDistribution{loan=Loan{recordId=fictitious-loan-id-3, ownership=FICTIONAL_OWNER_3}, totalValue=77777.0, currentWarranty=0.0, currentInterest=0.0, currentCapital=77777.0, warrantyOverdue=0.0, interestOverdue=0.0, lateFees=0.0, moratoryInterest=0.0, prepaymentBenefit=0.0, overdueCapital=0.0, unpaidWarranty=0.0, unpaidCapital=0.0}]}]}}`;

        const expectedOutput = {
            transactionId: "fictitious-event-id",
            version: "1.0",
            happenedOn: "2023-11-18T20:28:04.293240Z",
            metadata: {
                context: {
                    traceId: "fake-trace-id",
                    processName: "CustomerTransaction",
                    ipAddress: "123.456.789.012",
                    userAgent: "Fictitious UserAgent v1.0",
                    isMobileDevice: false,
                    toggles: [],
                    inquiryId: "fake-request-id",
                    country: "FAKE_COUNTRY",
                    platformTimeZoneId: "Fake/TimeZone"
                },
                topic: "prod-customer-financials-status",
                key: "fictitious-key"
            },
            history: [
                "com.example.event1",
                "com.example.event2",
                "com.example.event3"
            ],
            customer: {
                id: "fake-client-id",
                transactions: [
                    {
                        id: "fictitious-payment-id-1",
                        time: "2021-01-01T00:00:00Z",
                        medium: "Fictional_Channel_1",
                        value: "99999.000000",
                        loanDistribution: [
                            {
                                loan: {
                                    recordId: "fictitious-loan-id-1",
                                    ownership: "FICTIONAL_OWNER_1"
                                },
                                totalValue: "99999.0",
                                currentWarranty: "0.0",
                                currentInterest: "0.0",
                                currentCapital: "99999.0",
                                warrantyOverdue: "0.0",
                                interestOverdue: "0.0",
                                lateFees: "0.0",
                                moratoryInterest: "0.0",
                                prepaymentBenefit: "0.0",
                                overdueCapital: "0.0",
                                unpaidWarranty: "0.0",
                                unpaidCapital: "0.0"
                            }
                        ]
                    },
                    {
                        id: "fictitious-payment-id-2",
                        time: "2021-02-02T00:00:00Z",
                        medium: "Fictional_Channel_2",
                        value: "88888.000000",
                        loanDistribution: [
                            {
                                loan: {
                                    recordId: "fictitious-loan-id-2",
                                    ownership: "FICTIONAL_OWNER_2"
                                },
                                totalValue: "88888.0",
                                currentWarranty: "0.0",
                                currentInterest: "0.0",
                                currentCapital: "88888.0",
                                warrantyOverdue: "0.0",
                                interestOverdue: "0.0",
                                lateFees: "0.0",
                                moratoryInterest: "0.0",
                                prepaymentBenefit: "0.0",
                                overdueCapital: "0.0",
                                unpaidWarranty: "0.0",
                                unpaidCapital: "0.0"
                            }
                        ]
                    },
                    {
                        id: "fictitious-payment-id-3",
                        time: "2023-11-18T20:28:03Z",
                        medium: "Fictional_Channel_3",
                        value: "77777.000000",
                        loanDistribution: [
                            {
                                loan: {
                                    recordId: "fictitious-loan-id-3",
                                    ownership: "FICTIONAL_OWNER_3"
                                },
                                totalValue: "77777.0",
                                currentWarranty: "0.0",
                                currentInterest: "0.0",
                                currentCapital: "77777.0",
                                warrantyOverdue: "0.0",
                                interestOverdue: "0.0",
                                lateFees: "0.0",
                                moratoryInterest: "0.0",
                                prepaymentBenefit: "0.0",
                                overdueCapital: "0.0",
                                unpaidWarranty: "0.0",
                                unpaidCapital: "0.0"
                            }
                        ]
                    }
                ]
            }
        }

        assert.deepStrictEqual(JSON.parse(parseToJson(input)), expectedOutput);
    });
});