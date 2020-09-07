import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

// implementando a lógica do controller utilizando o schema criado

import { grade } from '../models/gradesModel.js';

const create = async (req, res) => {
  // dados da nova grade contida no body da requisição
  const data = new grade(req.body);

  try {
    // salvar nova grade no MongoDB

    await data.save();
    res.send(data);
    // fim do codigo implementado

    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    // implementa a logica de busca das grades
    const students = await grade.find(condition);

    const studentsList = students.map(({ _id, name, subject, type, value }) => {
      return {
        id: _id,
        name,
        subject,
        type,
        value,
      };
    });

    res.send(studentsList);

    //fim logica busca grades

    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    // implementa busca única de grade

    const student = await grade.findById(id);

    const { _id, name, subject, type, value } = student;

    res.send({
      id: _id,
      name,
      subject,
      type,
      value,
    });

    // fim código implementa busca única grade

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    // implementa atualização de grade de usuário
    const student = await grade.findOneAndUpdate(id, req.body, {
      new: true,
    });

    if (!!!student) {
      res.status(404).send('Documento não encontrado');
    } else {
      res.send(student);
    }
    // fim código implementa atualização de usuário

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    //implementa o delete de grade de usuário por id

    const student = await grade.findByIdAndDelete({ _id: id });

    if (!!!student) {
      res.status(404).send('Documento não encontrado');
    } else {
      res.sendStatus(200);
    }

    // fim do implementa delete

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    //implementa remover todos

    await grade.deleteMany({});

    res.sendStatus(200);

    //fim implementa remover todos

    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
