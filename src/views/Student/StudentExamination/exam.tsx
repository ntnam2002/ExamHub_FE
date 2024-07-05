import React from 'react'

const Exam = () => {
    // Function to generate question number buttons
    const generateQuestionButtons = () => {
        const buttons = []
        for (let i = 101; i <= 130; i++) {
            buttons.push(
                <button
                    key={i}
                    className="bg-gray-200 hover:bg-gray-300 text-center py-2 rounded"
                >
                    {i}
                </button>
            )
        }
        return buttons
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-4 border-r">
                <h2 className="text-xl font-semibold mb-4">
                    Thời gian làm bài:
                </h2>
                <div className="text-center mb-4">
                    <span className="text-2xl font-bold">00:33</span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded mb-4">
                    NỘP BÀI
                </button>
                <p className="text-sm text-gray-600 mb-4">
                    Khôi phục/lưu bài làm
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để
                    đánh dấu review
                </p>
                <div className="grid grid-cols-5 gap-2">
                    {/* Question number buttons */}
                    {generateQuestionButtons()}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
                <h2 className="text-2xl font-semibold mb-4">
                    Practice Set 2023 TOEIC Test 10
                </h2>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">
                        Part 5
                    </label>
                    <div className="bg-white p-4 rounded shadow">
                        {/* Questions */}
                        <div className="mb-4">
                            <p>
                                Aberdeen Bank offers a range of financial
                                services ------- the needs of its customers.
                            </p>
                            <div className="mt-2">
                                <label>
                                    <input
                                        type="radio"
                                        name="q101"
                                        value="A"
                                        className="mr-2"
                                    />
                                    A. meet
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q101"
                                        value="B"
                                        className="mr-2"
                                    />
                                    B. to meet
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q101"
                                        value="C"
                                        className="mr-2"
                                    />
                                    C. is meeting
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q101"
                                        value="D"
                                        className="mr-2"
                                    />
                                    D. meetings
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p>
                                ------- staff are asked to provide a backup cell
                                phone number and e-mail address.
                            </p>
                            <div className="mt-2">
                                <label>
                                    <input
                                        type="radio"
                                        name="q102"
                                        value="A"
                                        className="mr-2"
                                    />
                                    A. Every
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q102"
                                        value="B"
                                        className="mr-2"
                                    />
                                    B. All
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q102"
                                        value="C"
                                        className="mr-2"
                                    />
                                    C. Each
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q102"
                                        value="D"
                                        className="mr-2"
                                    />
                                    D. Any
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p>
                                Today, Mr. Rahn will present ------- ideas to
                                improve the companys accounting software.
                            </p>
                            <div className="mt-2">
                                <label>
                                    <input
                                        type="radio"
                                        name="q103"
                                        value="A"
                                        className="mr-2"
                                    />
                                    A. he
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q103"
                                        value="B"
                                        className="mr-2"
                                    />
                                    B. him
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q103"
                                        value="C"
                                        className="mr-2"
                                    />
                                    C. his
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q103"
                                        value="D"
                                        className="mr-2"
                                    />
                                    D. himself
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p>
                                The firms one-hour lunch policy is -------
                                enforced, so do not return late.
                            </p>
                            <div className="mt-2">
                                <label>
                                    <input
                                        type="radio"
                                        name="q104"
                                        value="A"
                                        className="mr-2"
                                    />
                                    A. strictly
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q104"
                                        value="B"
                                        className="mr-2"
                                    />
                                    B. hungrily
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="q104"
                                        value="C"
                                        className="mr-2"
                                    />
                                    C. punctually
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exam
