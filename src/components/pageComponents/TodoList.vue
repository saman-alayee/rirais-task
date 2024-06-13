<template>
    <div class="container-md mt-5">
        <BaseModal ref="modalInfo">
            <div class="popup-content mt-3" style="display: block;">
                <div class="popup-container">
                    <div class="popup-content-box">
                        <div class="mt-1 pr-1">
                            <p class="text-right h4">Add Task</p>
                            <div class="separator mb-4"></div>
                        </div>
                        <div>
                            <BaseInput class="w-100" label="Task" type="text" v-model="newTask.text" />
                            <BaseInput class="w-100" label="Description" type="text" v-model="newTask.description" />
                            <label class="mt-1" for="priority">Priority</label>
                            <select v-model="newTask.priority" class="form-select custom-input" id="priority"
                                aria-label="Priority">
                                <option disabled value="">Select priority</option>
                                <option value="Low">Low priority</option>
                                <option value="Middle">Middle priority</option>
                                <option value="High">High priority</option>
                            </select>
                            <BaseInput class="w-100 mt-2" label="Deadline" type="date" v-model="newTask.date" />
                        </div>
                        <div class="mt-3">
                            <BaseButton @click="addTaskHandler" buttonText="Add Task"
                                buttonClasses="btn btn-success mt-2 p-2" />
                            <BaseButton @click="closeInfo" buttonText="Close"
                                buttonClasses="btn btn-danger mt-2 mx-2 p-2" />
                        </div>
                    </div>
                </div>
            </div>
        </BaseModal>

        <div class="d-flex flex-wrap-reverse justify-content-center align-items-center mt-2">
            <div class="mt-1">
                <BaseButton buttonText="Add Task" @click="openInfo"
                    buttonClasses="btn-base btn btn-warning  btn-shadow" />
                <div class="btn-group px-3">
                    <button type="button" class="btn-base btn btn btn-warning dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Filter
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="setPriorityFilter(null)">All</a></li>
                        <li><a class="dropdown-item" href="#" @click="setPriorityFilter('Low')">Low priority</a></li>
                        <li><a class="dropdown-item" href="#" @click="setPriorityFilter('Middle')">Middle priority</a>
                        </li>
                        <li><a class="dropdown-item" href="#" @click="setPriorityFilter('High')">High priority</a></li>
                    </ul>
                </div>
            </div>
            <BaseInput type="text" v-model="search" placeholder="Search" />
        </div>

        <div class="card mt-3">
            <div class="card-body overflow-auto p-3">
                <table class="table table-hover" style="font-size: 18px;">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task, index) in paginatedTasks" :key="task.id">
                            <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                            <td>{{ task.text }}</td>
                            <td>{{ task.description }}</td>
                            <td>{{ task.date }}</td>
                            <td>
                                <span v-if="task.priority === 'Low'" class="badge bg-success">Low priority</span>
                                <span v-else-if="task.priority === 'Middle'" class="badge bg-warning text-dark">Middle
                                    priority</span>
                                <span v-else-if="task.priority === 'High'" class="badge bg-danger">High priority</span>
                            </td>
                            <td>
                                <BaseButton @click="deleteTaskHandler(task.id)" buttonText="Delete"
                                    buttonClasses="btn btn-danger btn-sm" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="gotoPage(currentPage - 1)">Previous</a>
                        </li>
                        <li v-for="pageNumber in totalPages" :key="pageNumber"
                            :class="{ 'page-item': true, active: pageNumber === currentPage }">
                            <a class="page-link" href="#" @click.prevent="gotoPage(pageNumber)">{{ pageNumber }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="gotoPage(currentPage + 1)">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '../UI/button/baseButton.vue';
import BaseInput from '../UI/input/index.vue';
import BaseDropdown from '../UI/button/baseDropdown.vue';
import BaseModal from '../UI/modal/index.vue';

export default {
    name: 'TodoList',
    components: {
        BaseButton,
        BaseInput,
        BaseDropdown,
        BaseModal
    },
    data() {
        return {
            search: '',
            currentPage: 1,
            perPage: 10, 
            newTask: {
                text: '',
                priority: '',
                description: '',
                date: null 
            },
            dropdownItems: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' }
            ],
            priorityFilter: null 
        };
    },
    computed: {
        tasks() {
            return this.$store.state.task.tasks;
        },
        filteredTasks() {
            return this.tasks.filter(task => {
                const matchesSearch = task.text.toLowerCase().includes(this.search.toLowerCase());
                const matchesPriorityFilter = !this.priorityFilter || task.priority === this.priorityFilter;
                return matchesSearch && matchesPriorityFilter;
            }).reverse();
        },
        paginatedTasks() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            const filtered = this.filteredTasks.slice(startIndex, endIndex);
            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredTasks.length / this.perPage);
        }
    },
    methods: {
        handleSelect(item) {
            console.log('Selected item:', item);
            this.newTask.property = item.value; 
        },
        openInfo() {
            this.$refs.modalInfo.openModal();
        },
        closeInfo() {
            this.$refs.modalInfo.closeModal();
        },
        addTaskHandler() {
            if (this.newTask.text && this.newTask.priority && this.newTask.description && this.newTask.date) {
                this.$store.dispatch('task/addTask', { ...this.newTask, id: Date.now() });
                this.newTask = { text: '', priority: '', description: '', property: null, date: '' };
                this.closeInfo();
            }
        },
        deleteTaskHandler(taskId) {
            this.$store.dispatch('task/deleteTask', taskId);
        },
        setPriorityFilter(priority) {
            this.priorityFilter = priority; // Set the priority filter
            this.currentPage = 1; // Reset currentPage when filter changes
        },
        gotoPage(pageNumber) {
            // Ensure pageNumber is within valid range
            if (pageNumber >= 1 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
            }
        }
    },
    created() {
        this.$store.dispatch('task/loadTasks');
    }
};
</script>
