const { projectList } = require("../db")

const getAllProjectList = (req, res)=>{
      console.log(req, "inside getALlProjectList")
      res.json(projectList)
}

const getProject = (req, res)=>{
      let projectId = req.body
      let project = projectList.find(el => el.id === projectId)
      req.json(project)
}

const updateProject = (req, res)=>{
      let updatedProject = req.body;
      let projectId = req.body.id;

      projectList = projectList.map(el=>{
            if(el.id === projectId){
                  return updatedProject;
            }
            return el
      })
}

const createProject = (req, res)=>{
      let newProject = req.body;
      projectList = projectList.push(newProject)
}

const deleteProject = (req, res) =>{
      let projectId = req.body;

      projectList = projectList.filter(el=>{
            return el.id === projectId
      })
}

module.exports = {
      getAllProjectList, getProject, updateProject, createProject, deleteProject
}